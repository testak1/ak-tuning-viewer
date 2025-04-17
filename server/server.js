
import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { createCanvas } from 'canvas'

const app = express()
const PORT = process.env.PORT || 3000
const __dirname = path.dirname(fileURLToPath(import.meta.url))

app.use(cors())
app.use(express.json())

const DATA_PATH = path.join(__dirname, 'data', 'audi_data_dropdown_fixed.json')

// GET: fetch JSON data
app.get('/api/data', (req, res) => {
  const raw = fs.readFileSync(DATA_PATH, 'utf-8')
  res.json(JSON.parse(raw))
})

// POST: login route
app.post('/api/login', (req, res) => {
  const { username, password } = req.body
  if (username === 'admin' && password === 'admin123') {
    res.json({ success: true })
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' })
  }
})

// PUT: update full JSON
app.put('/api/update', (req, res) => {
  try {
    fs.writeFileSync(DATA_PATH, JSON.stringify(req.body, null, 2), 'utf-8')
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
})

// GET: dyno.png
app.get('/dyno.png', (req, res) => {
  const { brand = 'Audi', model, year, motor } = req.query
  const db = JSON.parse(fs.readFileSync(DATA_PATH))
  const stages = db?.[brand]?.[model]?.[year]?.[motor] || {}

  const labels = []
  const hp = []
  const nm = []

  for (const [stage, values] of Object.entries(stages)) {
    labels.push(stage)
    const hkv = parseInt(values['EFFEKT']?.replace(/[^0-9]/g, '') || values['Optimerad']?.replace(/[^0-9]/g, '') || 0)
    const nmv = parseInt(values['VRIDMOMENT']?.replace(/[^0-9]/g, '') || values['Optimerad']?.replace(/[^0-9]/g, '') || 0)
    hp.push(hkv)
    nm.push(nmv)
  }

  const canvas = createCanvas(600, 300)
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = 'black'
  ctx.font = '16px sans-serif'
  ctx.fillText(`${brand} ${model} ${motor}`, 20, 25)

  const step = 50
  ctx.strokeStyle = 'gray'
  for (let i = 0; i < labels.length; i++) {
    const x = 80 + i * step * 2
    ctx.fillText(labels[i], x, 280)
  }

  ctx.strokeStyle = 'blue'
  ctx.beginPath()
  hp.forEach((v, i) => {
    const x = 80 + i * step * 2
    const y = 250 - v / 2
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
  })
  ctx.stroke()
  ctx.fillText('hk', 540, 40)

  ctx.strokeStyle = 'red'
  ctx.beginPath()
  nm.forEach((v, i) => {
    const x = 80 + i * step * 2
    const y = 250 - v / 4
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
  })
  ctx.stroke()
  ctx.fillText('Nm', 540, 60)

  res.setHeader('Content-Type', 'image/png')
  canvas.pngStream().pipe(res)
})

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`)
})
