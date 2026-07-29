const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');
const multer = require('multer');

const UPLOADS = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOADS)) fs.mkdirSync(UPLOADS);
const upload = multer({ dest: UPLOADS });

const DB_FILE = path.join(__dirname, 'db.json');
function readDB(){
  if (!fs.existsSync(DB_FILE)) return { deposits: [], config: { upiId: 'bharat@upi' } };
  return JSON.parse(fs.readFileSync(DB_FILE,'utf8'));
}
function writeDB(data){ fs.writeFileSync(DB_FILE, JSON.stringify(data,null,2)); }

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(UPLOADS));

// Get config (upi id)
app.get('/api/config', (req,res)=>{
  const db = readDB();
  res.json(db.config || { upiId: 'bharat@upi' });
});

// Update config (admin) - in production protect with auth
app.post('/api/config', (req,res)=>{
  const { upiId } = req.body;
  const db = readDB();
  db.config = db.config || {};
  db.config.upiId = upiId;
  writeDB(db);
  res.json({ ok:true, config: db.config });
});

// Create deposit
app.post('/api/deposits', async (req,res)=>{
  const { userName, amount } = req.body;
  if (!amount || isNaN(Number(amount))) return res.status(400).json({ error: 'Invalid amount' });
  const db = readDB();
  const id = 'D' + Date.now();
  const upiId = (db.config && db.config.upiId) || 'bharat@upi';
  const deposit = { id, userName: userName||'guest', amount: Number(amount), status: 'pending', upiId, createdAt: new Date().toISOString(), utr: null, receipt: null };
  db.deposits = db.deposits || [];
  db.deposits.push(deposit);
  writeDB(db);

  // generate UPI QR payload
  const upiPayload = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent('BharatAssets')}&am=${encodeURIComponent(Number(amount).toFixed(2))}&tn=${encodeURIComponent('Deposit '+id)}`;
  try{
    const qrd = await QRCode.toDataURL(upiPayload);
    res.json({ deposit, qr: qrd, upiPayload });
  }catch(err){
    res.status(500).json({ error: 'QR generation failed' });
  }
});

// Mark paid by user (attach UTR or receipt). Accept file upload.
app.post('/api/deposits/:id/paid', upload.single('receipt'), (req,res)=>{
  const id = req.params.id;
  const { utr } = req.body;
  const db = readDB();
  const dep = (db.deposits||[]).find(d=>d.id===id);
  if (!dep) return res.status(404).json({ error: 'Deposit not found' });
  dep.status = 'waiting_verification';
  dep.utr = utr || dep.utr;
  if (req.file) dep.receipt = '/uploads/' + req.file.filename;
  dep.paidAt = new Date().toISOString();
  writeDB(db);
  res.json({ ok:true, deposit: dep });
});

// Admin verify/approve/reject
app.post('/api/deposits/:id/verify', (req,res)=>{
  const id = req.params.id;
  const { action } = req.body; // 'approve'|'reject'
  const db = readDB();
  const dep = (db.deposits||[]).find(d=>d.id===id);
  if (!dep) return res.status(404).json({ error: 'Deposit not found' });
  if (action === 'approve') dep.status = 'approved';
  else if (action === 'reject') dep.status = 'rejected';
  else return res.status(400).json({ error: 'Invalid action' });
  dep.verifiedAt = new Date().toISOString();
  writeDB(db);
  res.json({ ok:true, deposit: dep });
});

// List deposits
app.get('/api/deposits', (req,res)=>{
  const db = readDB();
  res.json(db.deposits || []);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> console.log('Server running on', PORT));
