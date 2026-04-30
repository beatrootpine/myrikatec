import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useAppStore } from '../lib/store'
import { CheckCircle, XCircle } from 'lucide-react'

export default function AdminClaimsPage() {
  const { claims, approveClaim, rejectClaim, getEmployeeName } = useAppStore()

  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar title="Claims" />
        <div className="flex-1 overflow-auto p-8">
          <h1 className="text-4xl font-bold text-white mb-8">Expense Claims ({claims.length})</h1>
          
          <div className="space-y-4">
            {claims.map(claim => (
              <div key={claim.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xl font-bold text-white">{getEmployeeName(claim.employeeId)}</p>
                    <p className="text-slate-400 text-sm">Submitted: {new Date(claim.submittedAt).toLocaleDateString()}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    claim.status === 'pending' ? 'bg-yellow-900 text-yellow-300' :
                    claim.status === 'approved' ? 'bg-green-900 text-green-300' :
                    'bg-red-900 text-red-300'
                  }`}>
                    {claim.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-slate-800/50 rounded-lg">
                  {claim.meals > 0 && <div><p className="text-slate-400 text-sm">Meals</p><p className="text-white font-bold">R{claim.meals.toFixed(2)}</p></div>}
                  {claim.travel > 0 && <div><p className="text-slate-400 text-sm">Travel</p><p className="text-white font-bold">R{claim.travel.toFixed(2)}</p></div>}
                  {claim.accommodation > 0 && <div><p className="text-slate-400 text-sm">Accommodation</p><p className="text-white font-bold">R{claim.accommodation.toFixed(2)}</p></div>}
                  <div><p className="text-slate-400 text-sm">Total</p><p className="text-orange-500 font-bold">R{claim.total.toFixed(2)}</p></div>
                </div>

                {claim.status === 'pending' && (
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => approveClaim(claim.id)}
                      className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                    >
                      <CheckCircle size={18} />
                      <span>Approve</span>
                    </button>
                    <button 
                      onClick={() => rejectClaim(claim.id)}
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
