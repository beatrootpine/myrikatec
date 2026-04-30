import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useAppStore } from '../lib/store'

export default function AdminEmployeesPage() {
  const { employees } = useAppStore()

  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar title="Employees" />
        <div className="flex-1 overflow-auto p-8">
          <h1 className="text-4xl font-bold text-white mb-8">All Employees ({employees.length})</h1>
          
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-800 border-b border-slate-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Department</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Phone</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {employees.map(emp => (
                  <tr key={emp.id} className="hover:bg-slate-800/50 transition">
                    <td className="px-6 py-4 text-white font-medium">{emp.name}</td>
                    <td className="px-6 py-4 text-slate-400">{emp.email}</td>
                    <td className="px-6 py-4 text-slate-400">{emp.department}</td>
                    <td className="px-6 py-4 text-slate-400">{emp.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
