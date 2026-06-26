import { useState, useEffect } from 'react'
import API from '../api'

export default function Dashboard() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    API.get('/stats').then(({ data }) => setStats(data)).catch(console.error)
  }, [])

  if (!stats) return <div style={{ padding:'24px', color:'#8b949e' }}>Loading dashboard...</div>

  const card = { padding:'20px', borderRadius:'12px', border:'1px solid #30363d', background:'#161b22', textAlign:'center' }

  return (
    <div style={{ maxWidth:'900px', margin:'0 auto', padding:'24px 16px' }}>
      <h1 style={{ fontSize:'24px', fontWeight:600, marginBottom:'8px' }}>Impact Dashboard</h1>
      <p style={{ color:'#8b949e', fontSize:'14px', marginBottom:'28px' }}>Real-time overview of community issues.</p>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'16px', marginBottom:'32px' }}>
        {[['Total Issues', stats.total, '#7c6af5'], ['Open', stats.open, '#e24b4a'], ['Resolved', stats.resolved, '#639922']].map(([label, val, color]) => (
          <div key={label} style={card}>
            <div style={{ fontSize:'36px', fontWeight:700, color }}>{val}</div>
            <div style={{ fontSize:'13px', color:'#8b949e', marginTop:'6px' }}>{label}</div>
          </div>
        ))}
      </div>
      <h2 style={{ fontSize:'18px', fontWeight:500, marginBottom:'16px' }}>Issues by Category</h2>
      <div style={{ display:'grid', gap:'10px', marginBottom:'32px' }}>
        {stats.byCategory.map(({ _id, count }) => (
          <div key={_id} style={{ display:'flex', alignItems:'center', gap:'12px' }}>
            <span style={{ width:'90px', fontSize:'13px', textTransform:'capitalize', color:'#c9d1d9' }}>{_id}</span>
            <div style={{ flex:1, background:'#21262d', borderRadius:'4px', height:'18px' }}>
              <div style={{ height:'100%', borderRadius:'4px', background:'#7c6af5', width:`${stats.total ? Math.round((count/stats.total)*100) : 0}%`, transition:'width 0.6s' }} />
            </div>
            <span style={{ fontSize:'13px', fontWeight:500, minWidth:'20px', textAlign:'right' }}>{count}</span>
          </div>
        ))}
      </div>
      <h2 style={{ fontSize:'18px', fontWeight:500, marginBottom:'16px' }}>🏆 Top Contributors</h2>
      <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
        {stats.topUsers.length === 0
          ? <p style={{ color:'#8b949e', fontSize:'14px' }}>No contributors yet. Be the first to report!</p>
          : stats.topUsers.map((u, i) => (
            <div key={u._id} style={{ display:'flex', alignItems:'center', gap:'12px', padding:'12px 16px', borderRadius:'8px', border:'1px solid #30363d', background:'#161b22' }}>
              <span style={{ fontSize:'20px' }}>{['🥇','🥈','🥉','4️⃣','5️⃣'][i]}</span>
              <span style={{ flex:1, fontWeight:500 }}>{u.name}</span>
              <span style={{ fontSize:'13px', color:'#7c6af5', fontWeight:600 }}>{u.points} pts</span>
            </div>
          ))
        }
      </div>
    </div>
  )
}
