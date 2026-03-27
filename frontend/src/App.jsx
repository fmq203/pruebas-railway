import { useEffect, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

export default function App() {
  const [webStatus, setWebStatus] = useState(null)
  const [items, setItems] = useState([])
  const [nuevoItem, setNuevoItem] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/api/status`).then(r => r.json()),
      fetch(`${API_URL}/api/items`).then(r => r.json()),
    ])
      .then(([status, itemsData]) => {
        setWebStatus(status)
        setItems(itemsData)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const crearItem = async () => {
    if (!nuevoItem.trim()) return
    const res = await fetch(`${API_URL}/api/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre: nuevoItem }),
    })
    const item = await res.json()
    setItems(prev => [...prev, item])
    setNuevoItem('')
  }

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: 600, margin: '40px auto', padding: '0 20px' }}>
      <h1>Micro Test — Railway</h1>

      {loading && <p>Conectando...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {webStatus && (
        <div style={{ background: '#e8f5e9', padding: 12, borderRadius: 8, marginBottom: 20 }}>
          <strong>Backend Web:</strong> {webStatus.status}
        </div>
      )}

      <h2>Items</h2>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          value={nuevoItem}
          onChange={e => setNuevoItem(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && crearItem()}
          placeholder="Nombre del item..."
          style={{ flex: 1, padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc' }}
        />
        <button onClick={crearItem} style={{ padding: '8px 16px', borderRadius: 6, background: '#1976d2', color: '#fff', border: 'none', cursor: 'pointer' }}>
          Agregar
        </button>
      </div>

      <ul>
        {items.map(item => (
          <li key={item.id}>{item.nombre}</li>
        ))}
      </ul>
    </div>
  )
}
