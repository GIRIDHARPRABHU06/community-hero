import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api'
import toast from 'react-hot-toast'

export default function ReportIssue() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ title:'', description:'', address:'', lat:'', lng:'' })
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        setForm(f => ({ ...f, lat: pos.coords.latitude, lng: pos.coords.longitude }))
        toast.success('Location captured!')
      },
      () => toast.error('Could not get location')
    )
  }

  const handleSubmit = async () => {
    if (!localStorage.getItem('token')) return toast.error('Please login first')
    if (!form.title || !form.description) return toast.error('Title and description are required')
    setLoading(true)
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => fd.append(k, v))
      if (file) fd.append('media', file)
      await API.post('/issues', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
      toast.success('Issue reported! Gemini AI is categorizing it...')
      navigate('/')
    } catch { toast.error('Failed to submit issue') }
    finally { setLoading(false) }
  }

  const inp = { padding:'10px 12px', borderRadius:'8px', border:'1px solid #30363d', background:'#0d1117', color:'#e6edf3', width:'100%', fontSize:'14px' }
  const label = { fontSize:'13px', fontWeight:500, display:'block', marginBottom:'6px', color:'#c9d1d9' }

  return (
    <div style={{ maxWidth:'600px', margin:'0 auto', padding:'24px 16px' }}>
      <h1 style={{ fontSize:'24px', fontWeight:600, marginBottom:'8px' }}>Report an Issue</h1>
      <p style={{ color:'#8b949e', fontSize:'14px', marginBottom:'24px' }}>Gemini AI will automatically categorize your report.</p>
      <div style={{ display:'flex', flexDirection:'column', gap:'18px' }}>
        <div>
          <label style={label}>Title *</label>
          <input style={inp} placeholder="e.g. Large pothole on Main Street" value={form.title}
            onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
        </div>
        <div>
          <label style={label}>Description *</label>
          <textarea style={{ ...inp, minHeight:'100px', resize:'vertical' }}
            placeholder="Describe the issue in detail..."
            value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
        </div>
        <div>
          <label style={label}>Address</label>
          <div style={{ display:'flex', gap:'8px' }}>
            <input style={{ ...inp, flex:1 }} placeholder="Street address or landmark" value={form.address}
              onChange={e => setForm(f => ({ ...f, address: e.target.value }))} />
            <button onClick={getLocation} style={{ padding:'10px 14px', borderRadius:'8px', border:'1px solid #30363d', background:'#161b22', cursor:'pointer', color:'#e6edf3', whiteSpace:'nowrap' }}>
              📍 GPS
            </button>
          </div>
          {form.lat && <p style={{ fontSize:'12px', color:'#8b949e', marginTop:'4px' }}>📌 {Number(form.lat).toFixed(5)}, {Number(form.lng).toFixed(5)}</p>}
        </div>
        <div>
          <label style={label}>Photo / Video (optional)</label>
          <input type="file" accept="image/*,video/*" onChange={e => setFile(e.target.files[0])}
            style={{ fontSize:'13px', color:'#8b949e' }} />
        </div>
        <button onClick={handleSubmit} disabled={loading}
          style={{ padding:'13px', borderRadius:'8px', border:'none', background: loading ? '#4a3f8f' : '#7c6af5', color:'#fff', fontWeight:600, fontSize:'15px', cursor: loading ? 'not-allowed' : 'pointer' }}>
          {loading ? 'Submitting & analyzing with AI...' : 'Submit Issue'}
        </button>
      </div>
    </div>
  )
}
