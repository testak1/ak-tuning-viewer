
import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Admin from './Admin'
import './index.css'

function Root() {
  const [view, setView] = useState('app')

  return (
    <div>
      <nav className="flex justify-center gap-6 p-4 border-b mb-6">
        <button onClick={() => setView('app')} className="text-blue-600">Publik vy</button>
        <button onClick={() => setView('admin')} className="text-blue-600">Adminpanel</button>
      </nav>
      {view === 'app' ? <App /> : <Admin />}
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
)
