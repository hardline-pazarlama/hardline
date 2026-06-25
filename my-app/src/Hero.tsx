import { useLayoutEffect, useMemo, useRef } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Tek dosyada toplanmış 3D hero bölümü.
 *
 * - React Three Fiber + Drei ile sahne kurulur.
 * - OrbitControls KULLANILMAZ (kullanıcı sahneyi fareyle döndüremez);
 *   kamera ve obje yalnızca scroll'a bağlı GSAP ScrollTrigger ile animasyonlanır.
 * - Performans: frameloop="demand" + her scroll güncellemesinde invalidate(),
 *   yani kare yalnızca scroll değişince çizilir -> boşta FPS/pil tüketimi yok.
 * - Mobil uyumlu: dpr [1, 1.75] ile sınırlı, sahne ekran boyutuna göre ölçeklenir,
 *   ScrollTrigger resize'da otomatik refresh olur.
 */

/** Dönen + yaklaşan obje ve scroll'a bağlı kamera animasyonu. */
function HeroScene({ triggerRef }: { triggerRef: React.RefObject<HTMLElement | null> }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const { camera, invalidate } = useThree()

  // Geometriyi bir kez oluştur (her render'da yeniden üretme -> GC baskısı yok).
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1, 6), [])

  useLayoutEffect(() => {
    const mesh = meshRef.current
    const trigger = triggerRef.current
    if (!mesh || !trigger) return

    // Başlangıç durumu (scroll = 0).
    camera.position.set(0, 0, 6)
    camera.lookAt(0, 0, 0)
    mesh.rotation.set(0, 0, 0)
    mesh.scale.setScalar(1)

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1, // scroll'u yumuşatır (smooth)
          invalidateOnRefresh: true,
          // Sadece scroll değişince yeni kare iste (frameloop="demand" ile uyumlu).
          onUpdate: () => invalidate(),
          onRefresh: () => invalidate(),
        },
      })

      // Obje scroll boyunca döner...
      tl.to(mesh.rotation, { y: Math.PI * 3, x: Math.PI * 1.5 }, 0)
        // ...ve büyür (yaklaşıyor hissi).
        .to(mesh.scale, { x: 1.6, y: 1.6, z: 1.6, ease: 'power1.inOut' }, 0)
        // Kamera objeye doğru yaklaşır.
        .to(camera.position, { z: 2.4, ease: 'power2.inOut' }, 0)
        // Hafif yatay kayma ile dinamik bir his.
        .to(camera.position, { x: 0.8, ease: 'sine.inOut' }, 0)
        .add(() => camera.lookAt(0, 0, 0))

      invalidate() // ilk kareyi garanti et
    })

    return () => ctx.revert()
  }, [camera, invalidate, triggerRef])

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.6} />
      <directionalLight position={[-5, -3, -5]} intensity={0.6} color="#7aa2ff" />

      <mesh ref={meshRef} geometry={geometry}>
        <meshStandardMaterial
          color="#aa3bff"
          metalness={0.6}
          roughness={0.18}
          envMapIntensity={1.2}
        />
      </mesh>

      {/* Prosedürel ortam haritası: Lightformer'lardan yerel olarak üretilir.
          Ağdan HDR indirmez -> offline çalışır, demand frameloop'u bozmaz. */}
      <Environment resolution={256}>
        <Lightformer
          intensity={2}
          position={[0, 2, 4]}
          scale={[6, 6, 1]}
          color="#ffffff"
        />
        <Lightformer
          intensity={1.5}
          position={[-4, -1, -3]}
          scale={[4, 4, 1]}
          color="#7aa2ff"
        />
        <Lightformer
          intensity={1}
          position={[4, -2, 2]}
          scale={[3, 3, 1]}
          color="#ff7ad9"
        />
      </Environment>
    </>
  )
}

export default function Hero() {
  const wrapperRef = useRef<HTMLElement>(null)

  return (
    <section ref={wrapperRef} className="hero-wrap">
      {/* Sticky katman: scroll wrapper'ı kaydıkça canvas ekranda sabit kalır. */}
      <div className="hero-sticky">
        <Canvas
          // Performans ayarları
          frameloop="demand"
          dpr={[1, 1.75]}
          gl={{ antialias: true, powerPreference: 'high-performance' }}
          camera={{ position: [0, 0, 6], fov: 45 }}
        >
          <HeroScene triggerRef={wrapperRef} />
        </Canvas>

        <div className="hero-overlay">
          <h1>Hardline</h1>
          <p>Scroll ettikçe sahne döner ve yaklaşır</p>
          <span className="hero-scroll-hint" aria-hidden>
            ↓ kaydır
          </span>
        </div>
      </div>
    </section>
  )
}
