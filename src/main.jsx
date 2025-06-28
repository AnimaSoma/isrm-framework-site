
import React from 'react'
import ReactDOM from 'react-dom/client'

function App() {
  return (
    <div style={{ color: 'white', padding: '2rem', textAlign: 'center', background: '#111' }}>
      <h1>ISRM Framework</h1>
      <p>U(t) = ∫(P(t) - E(t)) dt — A New Paradigm of Adaptation</p>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
