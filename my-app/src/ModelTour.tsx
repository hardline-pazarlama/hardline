import { Component, Suspense, useEffect, useRef, useState, type ReactNode } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import {
  OrbitControls,
  Html,
  useGLTF,
  Environment,
  Lightformer,
  ContactShadows,
  SoftShadows,
} from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'

/**
 * .glb model + OrbitControls + 3 "tur noktası".
 *
 * - Model Drei'nin useGLTF'i ile yüklenir (varsayılan yol: /model.glb).
 *   Kendi modelinizi public/model.glb olarak koyun ya da <ModelTour url="..."/>.
 * - Kullanıcı fareyle döndürebilir (OrbitControls).
 * - 3 tur noktasından birine tıklayınca kamera GSAP ile o açıya YUMUŞAK geçer
 *   (geçiş sırasında OrbitControls kilitlenir, bitince açılır).
 * - Aktif noktada modelin yanında küçük bir bilgi kartı (Drei <Html>) belirir.
 */

type TourPoint = {
  id: string
  label: string
  // Kameranın gideceği konum ve baktığı hedef.
  camera: [number, number, number]
  target: [number, number, number]
  // Bilgi kartının 3D'deki konumu (modelin yanında).
  cardPosition: [number, number, number]
  title: string
  text: string
}

const TOUR_POINTS: TourPoint[] = [
  {
    id: 'front',
    label: 'Ön Görünüm',
    camera: [3.5, 1.8, 4.5],
    target: [0, 0.4, 0],
    cardPosition: [1.6, 1.1, 0.4],
    title: 'Ön Cephe',
    text: 'Modelin ön detaylarına yakınlaşan açı.',
  },
  {
    id: 'side',
    label: 'Yan Profil',
    camera: [-5, 1, 0.5],
    target: [0, 0.4, 0],
    cardPosition: [-1.8, 0.8, 0.6],
    title: 'Yan Profil',
    text: 'Soldan, profil hattını gösteren tur noktası.',
  },
  {
    id: 'top',
    label: 'Üst / Arka',
    camera: [0, 4.2, -4.5],
    target: [0, 0.2, 0],
    cardPosition: [0.2, 1.9, -1.4],
    title: 'Üst & Arka',
    text: 'Yukarıdan, arka tarafı kapsayan genel bakış.',
  },
]

const DEFAULT_CAMERA: [number, number, number] = [4, 3, 6]

/**
 * Sıcak, sinematik HDRI ortam ışığı.
 * - hdri verilirse gerçek bir .hdr/.exr dosyası yüklenir (Environment files).
 * - verilmezse, Lightformer'lardan YEREL olarak sıcak tonlu bir HDR cubemap
 *   üretilir (ağ gerektirmez); modele yumuşak IBL + yansıma kazandırır.
 */
function WarmEnvironment({ hdri }: { hdri?: string }) {
  if (hdri) {
    return <Environment files={hdri} environmentIntensity={1} />
  }
  return (
    <Environment resolution={256} environmentIntensity={0.9}>
      {/* Sıcak ana ışık (key) */}
      <Lightformer
        form="rect"
        intensity={3}
        color="#ffd9a0"
        position={[4, 5, 4]}
        scale={[7, 7, 1]}
      />
      {/* Amber kenar ışığı (rim) -> sinematik kontur */}
      <Lightformer
        form="rect"
        intensity={2.2}
        color="#ff8a3d"
        position={[-5, 2, -4]}
        scale={[6, 6, 1]}
      />
      {/* Yumuşak alttan dolgu */}
      <Lightformer
        form="circle"
        intensity={1.1}
        color="#fff0dd"
        position={[0, -3, 3]}
        scale={5}
      />
      {/* Üstten ince şerit ışık -> yansımalarda parlama */}
      <Lightformer
        form="rect"
        intensity={1.6}
        color="#ffe8c0"
        position={[0, 6, 0]}
        rotation-x={Math.PI / 2}
        scale={[10, 2, 1]}
      />
    </Environment>
  )
}

/** useGLTF ile gerçek modeli yükler. */
function GLTFModel({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} />
}

/** Model yüklenemezse (örn. dosya yok) gösterilecek yer tutucu. */
function PlaceholderModel() {
  return (
    <mesh castShadow position={[0, 0.4, 0]}>
      <torusKnotGeometry args={[0.7, 0.26, 160, 32]} />
      <meshStandardMaterial color="#aa3bff" metalness={0.6} roughness={0.2} />
    </mesh>
  )
}

/**
 * useGLTF hata fırlatırsa (404, bozuk dosya vb.) yer tutucuya düşer.
 * Böylece model henüz eklenmemişken bile sahne çalışır.
 */
class ModelBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

/** Canvas içi sahne: model, kontroller, kamera animasyonu, bilgi kartı. */
function TourScene({
  url,
  hdri,
  activeId,
  onActivate,
}: {
  url: string
  hdri?: string
  activeId: string | null
  onActivate: (id: string) => void
}) {
  const { camera } = useThree()
  const controlsRef = useRef<React.ComponentRef<typeof OrbitControls>>(null)
  const tweens = useRef<gsap.core.Tween[]>([])

  // activeId her değiştiğinde (buton VEYA 3D işaret) kamera o noktaya uçar.
  useEffect(() => {
    const point = TOUR_POINTS.find((p) => p.id === activeId)
    if (point) flyTo(point)
    // flyTo, ref'ler üzerinden çalışır; activeId yeterli bağımlılıktır.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId])

  const flyTo = (point: TourPoint) => {
    const controls = controlsRef.current
    if (!controls) return

    // Önceki geçişleri durdur (üst üste tıklamada zıplamayı engeller).
    tweens.current.forEach((t) => t.kill())

    controls.enabled = false // geçiş sırasında kullanıcı döndürmesin
    const ease = 'power2.inOut'
    const duration = 1.2

    tweens.current = [
      gsap.to(camera.position, {
        x: point.camera[0],
        y: point.camera[1],
        z: point.camera[2],
        duration,
        ease,
        onUpdate: () => controls.update(),
      }),
      gsap.to(controls.target, {
        x: point.target[0],
        y: point.target[1],
        z: point.target[2],
        duration,
        ease,
        onUpdate: () => controls.update(),
        onComplete: () => {
          controls.enabled = true
        },
      }),
    ]
  }

  const activePoint = TOUR_POINTS.find((p) => p.id === activeId) ?? null

  return (
    <>
      {/* Yumuşak (PCSS) gölge kenarları -> sinematik, sert olmayan gölgeler. */}
      <SoftShadows size={28} samples={16} focus={0.6} />

      {/* Sıcak ana ışık (gölge üreten) + hafif soğuk dolgu (kontrast). */}
      <ambientLight intensity={0.2} color="#ffe2c2" />
      <directionalLight
        position={[5, 7, 4]}
        intensity={2.2}
        color="#ffcf99"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0005}
      />
      <directionalLight position={[-5, 3, -4]} intensity={0.35} color="#5e74ff" />

      <Suspense fallback={null}>
        <ModelBoundary fallback={<PlaceholderModel />}>
          <GLTFModel url={url} />
        </ModelBoundary>
      </Suspense>

      {/* 3D'deki tıklanabilir tur noktası işaretleri. */}
      {TOUR_POINTS.map((point) => (
        <mesh
          key={point.id}
          position={point.cardPosition}
          onClick={(e) => {
            e.stopPropagation()
            onActivate(point.id)
          }}
          onPointerOver={() => (document.body.style.cursor = 'pointer')}
          onPointerOut={() => (document.body.style.cursor = 'auto')}
        >
          <sphereGeometry args={[0.09, 24, 24]} />
          <meshStandardMaterial
            color={point.id === activeId ? '#fff4e0' : '#ff9d3d'}
            emissive={point.id === activeId ? '#ff7a1a' : '#5a2a08'}
            emissiveIntensity={0.7}
          />
        </mesh>
      ))}

      {/* Aktif noktada modelin yanında beliren bilgi kartı. */}
      {activePoint && (
        <Html
          position={activePoint.cardPosition}
          center
          distanceFactor={6}
          zIndexRange={[10, 0]}
        >
          <div className="info-card">
            <h3>{activePoint.title}</h3>
            <p>{activePoint.text}</p>
          </div>
        </Html>
      )}

      {/* Sıcak sinematik HDRI ortam ışığı -> yumuşak IBL + yansıma. */}
      <WarmEnvironment hdri={hdri} />

      {/* Zemine yumuşak temas gölgesi (sıcak tonlu, premium his). */}
      <ContactShadows
        position={[0, -0.85, 0]}
        scale={11}
        far={3.5}
        blur={2.8}
        opacity={0.7}
        resolution={1024}
        color="#2a1206"
      />

      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        minDistance={2}
        maxDistance={12}
        target={new THREE.Vector3(0, 0.4, 0)}
      />
    </>
  )
}

export default function ModelTour({
  url = '/model.glb',
  hdri,
}: {
  url?: string
  /** Gerçek HDRI dosya yolu (örn. /studio.hdr). Verilmezse yerel sıcak rig kullanılır. */
  hdri?: string
}) {
  const [activeId, setActiveId] = useState<string | null>(null)

  return (
    <section className="tour-wrap">
      <Canvas
        shadows="soft"
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15, // sinematik pozlama
        }}
        camera={{ position: DEFAULT_CAMERA, fov: 45 }}
      >
        <TourScene url={url} hdri={hdri} activeId={activeId} onActivate={setActiveId} />
      </Canvas>

      {/* Tur noktası butonları (3D işaretlerle aynı noktaları tetikler). */}
      <div className="tour-controls">
        <span className="tour-hint">Fareyle döndür · bir tur noktası seç</span>
        <div className="tour-buttons">
          {TOUR_POINTS.map((point, i) => (
            <button
              key={point.id}
              type="button"
              className={point.id === activeId ? 'active' : ''}
              onClick={() => setActiveId(point.id)}
            >
              {i + 1}. {point.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

// Modeli önceden yükle (dosya varsa ilk gösterimi hızlandırır).
useGLTF.preload('/model.glb')
