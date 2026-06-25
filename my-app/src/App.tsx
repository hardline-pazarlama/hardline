import Hero from './Hero'
import ModelTour from './ModelTour'
import './App.css'

function App() {
  return (
    <>
      <Hero />
      {/* .glb model + OrbitControls + 3 tur noktası */}
      <ModelTour />
      <section className="after-hero">
        <h2>Devamı buraya…</h2>
        <p>Hero ve model turu tamamlandı.</p>
      </section>
    </>
  )
}

export default App
