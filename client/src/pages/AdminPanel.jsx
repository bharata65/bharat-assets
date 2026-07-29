import React, { useEffect, useState } from 'react'

export default function AdminPanel(){
  const [deposits, setDeposits] = useState([])
  const [upi, setUpi] = useState('')
  const [newUpi, setNewUpi] = useState('')

  useEffect(()=>{ load() }, [])
  function load(){
    fetch('/api/deposits').then(r=>r.json()).then(setDeposits)
    fetch('/api/config').then(r=>r.json()).then(c=>{ setUpi(c.upiId); setNewUpi(c.upiId) })
  }

  async function saveUpi(){
    await fetch('/api/config',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({upiId:newUpi})})
    load();
  }

  async function verify(id, action){
    await fetch('/api/deposits/'+id+'/verify',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action})})
    load();
  }

  return (
    <div className="container">
      <h2>Admin Panel</h2>
      <section className="card">
        <h3>Payment Settings</h3>
        <label>Current UPI ID</label>
        <div className="row"><input value={newUpi} onChange={e=>setNewUpi(e.target.value)} /> <button onClick={saveUpi}>Save</button></div>
        <p>Active UPI: <strong>{upi}</strong></p>
      </section>

      <section className="card">
        <h3>Deposits</h3>
        <table className="list">
          <thead><tr><th>ID</th><th>User</th><th>Amount</th><th>Status</th><th>UTR</th><th>Receipt</th><th>Actions</th></tr></thead>
          <tbody>
            {deposits.map(d=> (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.userName}</td>
                <td>₹ {d.amount}</td>
                <td>{d.status}</td>
                <td>{d.utr||'-'}</td>
                <td>{d.receipt ? <a href={d.receipt} target="_blank">view</a> : '-'}</td>
                <td>
                  {d.status !== 'approved' && <button onClick={()=>verify(d.id,'approve')}>Approve</button>}
                  {d.status !== 'rejected' && <button onClick={()=>verify(d.id,'reject')}>Reject</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}
