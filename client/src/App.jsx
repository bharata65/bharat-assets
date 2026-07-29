import React, { useEffect, useState } from 'react'
import UserDashboard from './pages/UserDashboard'
import AdminPanel from './pages/AdminPanel'

export default function App(){
  const [mode,setMode] = useState('user');
  return (
    <div className="app">
      <header className="topbar">
        <h1>Bharat Assets — Demo</h1>
        <div>
          <button onClick={()=>setMode('user')} className={mode==='user'? 'active':''}>User</button>
          <button onClick={()=>setMode('admin')} className={mode==='admin'? 'active':''}>Admin</button>
        </div>
      </header>
      <main>
        {mode==='user' ? <UserDashboard /> : <AdminPanel />}
      </main>
    </div>
  )
}
