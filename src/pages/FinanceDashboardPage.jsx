import { Link } from 'react-router-dom'
export default function FinanceDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-6xl mx-auto">
        <Link to="/dashboard" className="text-orange-600 mb-6 inline-block font-semibold">← Dashboard</Link>
        <h1 className="text-4xl font-bold text-white mb-8">Finance</h1>
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-8">
          <p className="text-slate-300">No claims to review</p>
        </div>
      </div>
    </div>
  )
}
