import { useState, useEffect } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

export default function App() {
  const [foods, setFoods] = useState([])
  const [form, setForm] = useState({ name: '', description: '', price: '' })
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchFoods()
  }, [])

  async function fetchFoods() {
    try {
      const res = await fetch(`${API_URL}/api/foods`)
      setFoods(await res.json())
    } catch {
      setError('Could not reach backend')
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    await fetch(`${API_URL}/api/foods`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, price: parseFloat(form.price) }),
    })
    setForm({ name: '', description: '', price: '' })
    fetchFoods()
  }

  async function handleDelete(id) {
    await fetch(`${API_URL}/api/foods/${id}`, { method: 'DELETE' })
    fetchFoods()
  }

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1>Food App</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          required
        />
        <input
          placeholder="Description"
          value={form.description}
          onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
        />
        <input
          type="number"
          step="0.01"
          placeholder="Price"
          value={form.price}
          onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
          required
        />
        <button type="submit">Add Food</button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {foods.map(food => (
          <li key={food.id} style={{ borderBottom: '1px solid #eee', padding: '8px 0', display: 'flex', justifyContent: 'space-between' }}>
            <span>
              <strong>{food.name}</strong> — {food.description} (${food.price.toFixed(2)})
            </span>
            <button onClick={() => handleDelete(food.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
