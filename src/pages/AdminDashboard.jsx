import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

export default function AdminDashboard() {
  const employees = [
    { id: 1, name: 'John Smith', email: 'john@rikatec.com', department: 'Sales' },
    { id: 2, name: 'Jane Doe', email: 'jane@rikatec.com', department: 'HR' },
    { id: 3, name: 'Bob Wilson', email: 'bob@rikatec.com', department: 'Finance' },
  ]

  const requests = [
    { id: 1, type: 'Leave', employee: 'John Smith', status: 'pending', date: '2026-04-30' },
    { id: 2, type: 'Claim', employee: 'Jane Doe', status: 'approved', date: '2026-04-28' },
    { id: 3, type: 'Payment', employee: 'Bob Wilson', status: 'pending', date: '2026-04-29' },
  ]

  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar title="Admin Dashboard" />
        <div className="flex-1 overflow-auto p-8">
          <h1 className="text-4xl font-bold text-white mb-8">System Overview</h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {[
              { label: 'Total Employees', value: '24' },
              { label: 'Pending Requests', value: '7' },
              { label: 'Leave Requests', value: '3' },
              { label: 'Approval Rate', value: '89%' }
            ].map(stat => (
              <div key={stat.label} className="bg-slate-900 border border-slate-800 rounded-lg p-6">
                <p className="text-slate-400 text-sm mb-2">{stat.label}</p>
                <p className="text-3xl font-bold text-orange-600">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Employees List */}
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Employees</h2>
              <div className="space-y-3">
                {employees.map(emp => (
                  <div key={emp.id} className="bg-slate-800/50 rounded-lg p-4 flex justify-between items-start">
                    <div>
                      <p className="text-white font-medium">{emp.name}</p>
                      <p className="text-slate-400 text-sm">{emp.department}</p>
                      <p className="text-slate-500 text-xs">{emp.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Requests */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Recent Requests</h2>
              <div className="space-y-3">
                {requests.map(req => (
                  <div key={req.id} className="bg-slate-800/50 rounded-lg p-3">
                    <p className="text-white font-medium text-sm">{req.type}</p>
                    <p className="text-slate-400 text-xs">{req.employee}</p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-xs text-slate-500">{req.date}</span>
                      <span className={`text-xs px-2 py-1 rounded ${req.status === 'pending' ? 'bg-yellow-900 text-yellow-300' : 'bg-green-900 text-green-300'}`}>
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
