import React, { useEffect, useState } from 'react'
import DepositForm from '../components/DepositForm'

export default function UserDashboard(){
  const [deposits, setDeposits] = useState([])
  useEffect(()=>{ fetch('/api/deposits').then(r=>r.json()).then(setDeposits) }, [])
  return (
    <div className="container">
      <h2>User Dashboard</h2>
      <DepositForm onCreated={(d)=> setDeposits(prev=>[d.deposit,...prev])} />
      <h3>Your deposits</h3>
      <table className="list">
        <thead><tr><th>ID</th><th>Amount</th><th>Status</th><th>QR</th></tr></thead>
        <tbody>
          {deposits.map(d=> (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>₹ {d.amount}</td>
              <td>{d.status}</td>
              <td>{d.qr ? <img src={d.qr} width={80} alt="qr"/> : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
