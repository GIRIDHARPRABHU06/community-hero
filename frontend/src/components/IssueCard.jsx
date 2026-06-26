import API from '../api'
import toast from 'react-hot-toast'

const CAT_COLORS = { pothole:'#e24b4a', streetlight:'#ef9f27', water:'#378add', waste:'#639922', other:'#888780' }
const STATUS_LABELS = { open:'🔴 Open', 'in-progress':'🟡 In Progress', resolved:'🟢 Resolved' }

export default function IssueCard({ issue, onVote, onStatusChange }) {
  const handleStatus = async (status) => {
    if (!localStorage.getItem('token')) return toast.error('Login required')
    try {
      await API.patch(`/issues/${issue._id}/status`, { status })
      toast.success('Status updated')
      onStatusChange()
    } catch { toast.error('Update failed') }
  }

  const card = { padding:'20px', borderRadius:'12px', border:'1px solid #30363d', background:'#161b22' }
  const badge = (cat) => ({ padding:'3px 10px', borderRadius:'20px', fontSize:'11px', fontWeight:500, background: CAT_COLORS[cat] + '25', color: CAT_COLORS[cat], textTransform:'capitalize' })
  const btn = (active) => ({ padding:'4px 10px', fontSize:'11px', borderRadius:'4px', border:'1px solid #30363d', background: active ? '#7c6af5' : 'transparent', color: active ? '#fff' : '#8b949e', cursor:'pointer', textTransform:'capitalize' })

  return (
    <div style={card}>
      <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'12px' }}>
        <span style={badge(issue.category)}>{issue.category}</span>
        <span style={{ fontSize:'12px', color:'#8b949e', marginLeft:'auto' }}>{STATUS_LABELS[issue.status]}</span>
      </div>
      <h3 style={{ fontSize:'16px', fontWeight:500, marginBottom:'6px', color:'#e6edf3' }}>{issue.title}</h3>
      {issue.aiSummary && <p style={{ fontSize:'13px', color:'#7c6af5', marginBottom:'8px' }}>🤖 {issue.aiSummary}</p>}
      <p style={{ fontSize:'13px', color:'#8b949e', marginBottom:'12px' }}>{issue.description}</p>
      {issue.location?.address && <p style={{ fontSize:'12px', color:'#6e7681', marginBottom:'8px' }}>📍 {issue.location.address}</p>}
      {issue.mediaUrl && (
        issue.mediaType === 'video'
          ? <video src={issue.mediaUrl} controls style={{ width:'100%', borderRadius:'8px', marginBottom:'12px', maxHeight:'200px' }} />
          : <img src={issue.mediaUrl} alt="issue" style={{ width:'100%', borderRadius:'8px', marginBottom:'12px', maxHeight:'200px', objectFit:'cover' }} />
      )}
      <div style={{ display:'flex', alignItems:'center', gap:'10px', flexWrap:'wrap' }}>
        <button onClick={() => onVote(issue._id)} style={{ padding:'6px 14px', borderRadius:'6px', border:'1px solid #30363d', background:'transparent', cursor:'pointer', fontSize:'13px', color:'#e6edf3' }}>
          👍 {issue.votes?.length || 0}
        </button>
        <span style={{ fontSize:'12px', color:'#6e7681' }}>by {issue.reporter?.name || 'Anonymous'}</span>
        <div style={{ marginLeft:'auto', display:'flex', gap:'6px' }}>
          {['open','in-progress','resolved'].map(s => (
            <button key={s} onClick={() => handleStatus(s)} style={btn(issue.status === s)}>{s}</button>
          ))}
        </div>
      </div>
    </div>
  )
}
