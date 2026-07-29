import React, { useState } from 'react'

export default function DepositForm({ onCreated }){
  const [amount,setAmount] = useState('')
  const [name,setName] = useState('')
  const [qr, setQr] = useState(null)
  const [deposit, setDeposit] = useState(null)
  const [utr, setUtr] = useState('')
  const [receipt, setReceipt] = useState(null)

  async function create(e){
    e.preventDefault();
    const res = await fetch('/api/deposits',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({userName:name,amount})})
    const data = await res.json();
    setQr(data.qr);
    setDeposit(data.deposit);
    if (onCreated) onCreated(data);
  }

  async function markPaid(){
    if (!deposit) return;
    const fd = new FormData();
    fd.append('utr', utr);
    if (receipt) fd.append('receipt', receipt);
    const res = await fetch('/api/deposits/'+deposit.id+'/paid',{method:'POST',body:fd});
    const data = await res.json();
    alert('Marked paid: ' + data.deposit.status);
  }

  return (
    <div className="card">
      <h3>Manual Deposit (UPI)</h3>
      <form onSubmit={create} className="row">
        <input placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} />
        <input placeholder="Amount (INR)" value={amount} onChange={e=>setAmount(e.target.value)} />
        <button type="submit">Create Deposit & Generate QR</button>
      </form>

      {qr && deposit && (
        <div className="qrBox">
          <h4>Scan to Pay</h4>
          <img src={qr} alt="upi-qr" width={200} />
          <p>Deposit ID: {deposit.id} • Amount: ₹ {deposit.amount}</p>
          <div className="row">
            <input placeholder="Enter UTR / Transaction ID" value={utr} onChange={e=>setUtr(e.target.value)} />
            <input type="file" onChange={e=>setReceipt(e.target.files[0])} />
          </div>
          <button onClick={markPaid}>I Have Paid (Upload UTR/Receipt)</button>
        </div>
      )}
    </div>
  )
}
