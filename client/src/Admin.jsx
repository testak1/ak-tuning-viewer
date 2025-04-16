
import { useEffect, useState } from 'react'

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [form, setForm] = useState({ username: '', password: '' })
  const [data, setData] = useState({})
  const [selected, setSelected] = useState({ brand: 'Audi', model: '', year: '', motor: '' })

  const login = async () => {
    const res = await fetch('https://ak-tuning-viewer.onrender.com/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    if (res.ok) setLoggedIn(true)
    else alert('Fel användarnamn eller lösenord')
  }

  useEffect(() => {
    if (loggedIn) {
      fetch('https://ak-tuning-viewer.onrender.com/api/data')
        .then(res => res.json())
        .then(setData)
    }
  }, [loggedIn])

  const models = Object.keys(data?.Audi || {})
  const years = selected.model ? Object.keys(data.Audi[selected.model]) : []
  const motors = selected.year ? Object.keys(data.Audi[selected.model][selected.year]) : []
  const stages = selected.motor ? data.Audi[selected.model][selected.year][selected.motor] : {}

  const updateValue = (stage, key, val) => {
    const updated = { ...data }
    updated[selected.brand][selected.model][selected.year][selected.motor][stage][key] = val
    setData(updated)
  }

  const saveChanges = async () => {
    const res = await fetch('https://ak-tuning-viewer.onrender.com/api/update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (res.ok) alert('✅ Sparat!')
    else alert('❌ Kunde inte spara')
  }

  if (!loggedIn) return (
    <div className="max-w-sm mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Admin Login</h2>
      <input className="w-full border p-2 mb-2" placeholder="Användarnamn"
        value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} />
      <input className="w-full border p-2 mb-4" placeholder="Lösenord" type="password"
        value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
      <button className="bg-black text-white px-4 py-2 w-full" onClick={login}>Logga in</button>
    </div>
  )

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Adminpanel</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <select className="p-2 border" onChange={e => setSelected({ brand: 'Audi', model: e.target.value })}>
          <option value="">Välj modell</option>
          {models.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
        {selected.model && (
          <select className="p-2 border" onChange={e => setSelected(prev => ({ ...prev, year: e.target.value }))}>
            <option value="">Välj år</option>
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        )}
        {selected.year && (
          <select className="p-2 border" onChange={e => setSelected(prev => ({ ...prev, motor: e.target.value }))}>
            <option value="">Välj motor</option>
            {motors.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        )}
      </div>

      {selected.motor && (
        <>
          <div className="space-y-4">
            {Object.entries(stages).map(([stage, values]) => (
              <div key={stage} className="border p-3 rounded">
                <h3 className="font-semibold">{stage}</h3>
                {Object.entries(values).map(([k, v]) => (
                  <div key={k} className="flex gap-2 items-center mb-1">
                    <label className="w-32 font-medium">{k}:</label>
                    <input
                      className="flex-1 p-1 border"
                      value={v}
                      onChange={e => updateValue(stage, k, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>

          <button onClick={saveChanges} className="bg-green-600 text-white px-4 py-2 mt-6">💾 Spara ändringar</button>
        </>
      )}
    </div>
  )
}
