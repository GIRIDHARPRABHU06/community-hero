import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import API from '../api'
import IssueCard from '../components/IssueCard'
import toast from 'react-hot-toast'

const CATEGORIES = ['all','pothole','streetlight','water','waste','other']
const STATUSES = ['all','open','in-progress','resolved']

export default function Home() {
  const [issues, setIssues] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('all')
  const [status, setStatus] = useState('all')

  const fetchIssues = async () => {
    try {
      const params = {}
      if (category !== 'all') params.category = category
      if (status !== 'all') params.status = status
      const { data } = await API.get('/issues', { params })
      setIssues(data)
    } catch { toast.error('Failed to load issues') }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchIssues() }, [category, status])

  const handleVote = async (id) => {
    if (!localStorage.getItem('token')) return toast.error('Login to vote')
    try {
      await API.post(`/issues/${id}/vote`)
      fetchIssues()
    } catch { toast.error('Vote failed') }
  }

  const sel = { padding:'6px 10px', borderRadius:'6px', border:'1px solid #30363d', background:'#161b22', color:'#e6edf3', fontSize:'13px' }

  return (
    <div style={{ maxWidth:'900px', margin:'0 auto', padding:'24px 16px' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'24px', flexWrap:'wrap', gap:'12px' }}>
        <div>
          <h1 style={{ fontSize:'28px', fontWeight:600, marginBottom:'4px' }}>Community Issues</h1>
          <p style={{ color:'#8b949e', fontSize:'14px' }}>Report, vote, and track issues in your neighbourhood.</p>
        </div>
        <Link to="/report" style={{ padding:'10px 18px', borderRadius:'8px', background:'#7c6af5', color:'#fff', textDecoration:'none', fontWeight:500, fontSize:'14px' }}>
          + Report Issue
        </Link>
      </div>
      <div style={{ display:'flex', gap:'16px', marginBottom:'24px', flexWrap:'wrap' }}>
        <div>
          <label style={{ fontSize:'12px', color:'#8b949e', display:'block', marginBottom:'4px' }}>Category</label>
          <select value={category} onChange={e => setCategory(e.target.value)} style={sel}>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label style={{ fontSize:'12px', color:'#8b949e', display:'block', marginBottom:'4px' }}>Status</label>
          <select value={status} onChange={e => setStatus(e.target.value)} style={sel}>
            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
      {loading ? <p style={{ color:'#8b949e' }}>Loading...</p> : (
        <div style={{ display:'grid', gap:'16px' }}>
          {issues.length === 0
            ? <p style={{ color:'#8b949e' }}>No issues found. Be the first to report one!</p>
            : issues.map(issue => <IssueCard key={issue._id} issue={issue} onVote={handleVote} onStatusChange={fetchIssues} />)
          }
        </div>
      )}
    </div>
  )
}
