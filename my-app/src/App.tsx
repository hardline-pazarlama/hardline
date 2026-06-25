import Hero from './Hero'
import './App.css'

function App() {
  return (
    <>
      <Hero />
      {/* Hero sonrası içerik buraya gelebilir. */}
      <section className="after-hero">
        <h2>Devamı buraya…</h2>
        <p>Hero bölümü scroll boyunca animasyonunu tamamladı.</p>
      </section>
    </>
  )
}

export default App
