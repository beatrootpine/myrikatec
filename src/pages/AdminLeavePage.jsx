import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useAppStore } from '../lib/store'
import { CheckCircle, XCircle } from 'lucide-react'

export default function AdminLeavePage() {
  const { leaveRequests, approveLeaveRequest, rejectLeaveRequest, getEmployeeName } = useAppStore()

  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar title="Leave Requests" />
        <div className="flex-1 overflow-auto p-8">
          <h1 className="text-4xl font-bold text-white mb-8">Leave Requests ({leaveRequests.length})</h1>
          
          <div className="space-y-4">
            {leaveRequests.map(req => (
              <div key={req.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xl font-bold text-white">{getEmployeeName(req.employeeId)}</p>
                    <p className="text-slate-400 text-sm">{req.startDate} to {req.endDate}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    req.status === 'pending' ? 'bg-yellow-900 text-yellow-300' :
                    req.status === 'approved' ? 'bg-green-900 text-green-300' :
                    'bg-red-900 text-red-300'
                  }`}>
                    {req.status}
                  </span>
                </div>
                
                <div className="mb-4">
                  <p className="text-slate-400">{req.days} days • {req.type}</p>
                  <p className="text-slate-300 mt-2">{req.reason}</p>
                </div>

                {req.status === 'pending' && (
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => approveLeaveRequest(req.id)}
                      className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                    >
                      <CheckCircle size={18} />
                      <span>Approve</span>
                    </button>
                    <button 
                      onClick={() => rejectLeaveRequest(req.id)}
                      className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                    >
                      <XCircle size={18} />
                      <span>Reject</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
