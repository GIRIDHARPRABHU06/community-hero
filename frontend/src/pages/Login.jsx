import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import API from '../api'
import toast from 'react-hot-toast'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email:'', password:'' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const { data } = await API.post('/auth/login', form)
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      toast.success(`Welcome back, ${data.user.name}!`)
      navigate('/')
    } catch { toast.error('Invalid email or password') }
    finally { setLoading(false) }
  }

  const inp = { padding:'10px 12px', borderRadius:'8px', border:'1px solid #30363d', background:'#0d1117', color:'#e6edf3', width:'100%', fontSize:'14px' }

  return (
    <div style={{ maxWidth:'400px', margin:'80px auto', padding:'32px', borderRadius:'12px', border:'1px solid #30363d', background:'#161b22' }}>
      <h1 style={{ fontSize:'22px', fontWeight:600, marginBottom:'24px', textAlign:'center' }}>Login</h1>
      <div style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
        <input style={inp} type="email" placeholder="Email" value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
        <input style={inp} type="password" placeholder="Password" value={form.password}
          onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
        <button onClick={handleSubmit} disabled={loading}
          style={{ padding:'12px', borderRadius:'8px', border:'none', background:'#7c6af5', color:'#fff', fontWeight:600, cursor:'pointer', fontSize:'15px' }}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <p style={{ textAlign:'center', fontSize:'13px', color:'#8b949e' }}>
          No account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  )
}
