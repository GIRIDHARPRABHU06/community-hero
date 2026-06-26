import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  const logout = () => {
    localStorage.clear()
    navigate('/login')
  }

  const nav = { position:'fixed', top:0, left:0, right:0, height:'64px', background:'#161b22', borderBottom:'1px solid #30363d', display:'flex', alignItems:'center', padding:'0 24px', zIndex:100, gap:'24px' }
  const link = { fontSize:'14px', color:'#8b949e', textDecoration:'none' }

  return (
    <nav style={nav}>
      <Link to="/" style={{ fontWeight:600, fontSize:'18px', textDecoration:'none', color:'#e6edf3' }}>
        🏘️ Community Hero
      </Link>
      <div style={{ flex:1 }} />
      <Link to="/" style={link}>Issues</Link>
      <Link to="/report" style={link}>Report</Link>
      <Link to="/dashboard" style={link}>Dashboard</Link>
      {user ? (
        <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
          <span style={{ fontSize:'13px', color:'#8b949e' }}>{user.name} · {user.points || 0} pts</span>
          <button onClick={logout} style={{ padding:'6px 12px', borderRadius:'6px', border:'1px solid #30363d', background:'transparent', cursor:'pointer', fontSize:'13px', color:'#e6edf3' }}>Logout</button>
        </div>
      ) : (
        <Link to="/login" style={{ padding:'6px 14px', borderRadius:'6px', background:'#7c6af5', color:'#fff', textDecoration:'none', fontSize:'13px', fontWeight:500 }}>Login</Link>
      )}
    </nav>
  )
}
