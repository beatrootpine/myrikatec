import { Link } from 'react-router-dom'

export default function LeaveRequestPage() {
  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-2xl mx-auto">
        <Link to="/dashboard" className="text-orange-600 mb-4 block">← Back</Link>
        <h1 className="text-4xl font-bold text-white mb-8">Request Leave</h1>
        <form className="bg-slate-900 border border-slate-800 rounded-lg p-8 space-y-6">
          <button type="button" className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-medium">Submit</button>
        </form>
      </div>
    </div>
  )
}
