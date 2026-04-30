import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useAppStore } from '../lib/store'
import { Link } from 'react-router-dom'

export default function AdminDashboard() {
  const { employees, leaveRequests, claims, payments } = useAppStore()
  
  const pendingLeaves = leaveRequests.filter(r => r.status === 'pending').length
  const pendingClaims = claims.filter(c => c.status === 'pending').length
  const pendingPayments = payments.filter(p => p.status === 'pending').length
  const totalEmployees = employees.length

  const recentRequests = [
    ...leaveRequests.map(r => ({ type: 'Leave', id: r.id, status: r.status, date: new Date(r.submittedAt).toLocaleDateString() })),
    ...claims.map(c => ({ type: 'Claim', id: c.id, status: c.status, date: new Date(c.submittedAt).toLocaleDateString() })),
    ...payments.map(p => ({ type: 'Payment', id: p.id, status: p.status, date: new Date(p.submittedAt).toLocaleDateString() }))
  ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 6)

  return (
    <div className="flex flex-col md:flex-row h-screen bg-slate-950">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar title="Admin Dashboard" />
        <div className="flex-1 overflow-auto p-4 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 md:mb-8">System Overview</h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-8">
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 md:p-6">
              <p className="text-slate-400 text-xs md:text-sm mb-2">Total Employees</p>
              <p className="text-2xl md:text-4xl font-bold text-orange-600">{totalEmployees}</p>
            </div>
            <Link to="/admin/leave" className="bg-slate-900 border border-slate-800 hover:border-orange-600 rounded-lg p-3 md:p-6 transition">
              <p className="text-slate-400 text-xs md:text-sm mb-2">Pending Leaves</p>
              <p className="text-2xl md:text-4xl font-bold text-yellow-500">{pendingLeaves}</p>
            </Link>
            <Link to="/admin/claims" className="bg-slate-900 border border-slate-800 hover:border-orange-600 rounded-lg p-3 md:p-6 transition">
              <p className="text-slate-400 text-xs md:text-sm mb-2">Pending Claims</p>
              <p className="text-2xl md:text-4xl font-bold text-blue-500">{pendingClaims}</p>
            </Link>
            <Link to="/admin/payments" className="bg-slate-900 border border-slate-800 hover:border-orange-600 rounded-lg p-3 md:p-6 transition">
              <p className="text-slate-400 text-xs md:text-sm mb-2">Pending Payments</p>
              <p className="text-2xl md:text-4xl font-bold text-green-500">{pendingPayments}</p>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Employees */}
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
              <Link to="/admin/employees" className="flex justify-between items-center mb-6 hover:text-orange-600">
                <h2 className="text-lg md:text-xl font-bold text-white">Employees ({totalEmployees})</h2>
                <span className="text-slate-400 text-xs md:text-sm">View all →</span>
              </Link>
              <div className="space-y-2 max-h-96 overflow-auto">
                {employees.slice(0, 5).map(emp => (
                  <div key={emp.id} className="bg-slate-800/50 rounded-lg p-3">
                    <p className="text-white font-medium text-sm">{emp.name}</p>
                    <p className="text-slate-400 text-xs">{emp.department}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6">Recent Activity</h2>
              <div className="space-y-2 max-h-96 overflow-auto">
                {recentRequests.map(req => (
                  <div key={req.id} className="bg-slate-800/50 rounded-lg p-2 md:p-3">
                    <p className="text-white font-medium text-xs md:text-sm">{req.type}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-slate-500 text-xs">{req.date}</span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        req.status === 'pending' ? 'bg-yellow-900 text-yellow-300' :
                        req.status === 'approved' ? 'bg-green-900 text-green-300' :
                        'bg-red-900 text-red-300'
                      }`}>
                        {req.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
