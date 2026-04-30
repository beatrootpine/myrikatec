import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const initialData = {
  employees: [
    { id: 1, name: 'Mosotho Moshoane', email: 'Mosotho.Moshoane@rikatec.co.za', department: 'Management', phone: '+27 11 555 1234' },
    { id: 2, name: 'Rivo M', email: 'rivo@rikatec.co.za', department: 'CEO', phone: '+27 11 111 1111' },
    { id: 3, name: 'Busi S', email: 'busi@rikatec.co.za', department: 'Finance', phone: '+27 11 222 2222' },
    { id: 4, name: 'Sakhile N', email: 'sakhile@rikatec.co.za', department: 'HR', phone: '+27 11 333 3333' },
  ],
  leaveRequests: [
    { id: 1, employeeId: 1, type: 'annual', days: 5, startDate: '2026-05-01', endDate: '2026-05-05', reason: 'Holiday', status: 'pending', submittedAt: new Date().toISOString() },
  ],
  claims: [
    { id: 1, employeeId: 1, meals: 1750, travel: 579.20, accommodation: 0, total: 2329.20, status: 'pending', submittedAt: new Date().toISOString() },
  ],
  payments: [
    { 
      id: 1, 
      employeeId: 1, 
      supplier: 'ABC Supplies', 
      amount: 5000, 
      approvers: [2, 3, 4], 
      status: 'pending', 
      deadline: '2026-05-15',
      invoice: { name: 'invoice-001.pdf', size: 256 },
      approvalHistory: [],
      submittedAt: new Date().toISOString() 
    },
  ],
  itRequests: [],
  settings: {
    maxMealsDay: 350,
    travelRate: 4.84,
    maxAccommodationNight: 1200,
    leaveTypes: ['annual', 'sick', 'compassionate'],
  }
}

export const useAppStore = create(
  persist(
    (set, get) => ({
      ...initialData,
      
      // Employees
      addEmployee: (employee) => set(state => ({
        employees: [...state.employees, { ...employee, id: Math.max(...state.employees.map(e => e.id)) + 1 }]
      })),
      updateEmployee: (id, updates) => set(state => ({
        employees: state.employees.map(e => e.id === id ? {...e, ...updates} : e)
      })),
      deleteEmployee: (id) => set(state => ({
        employees: state.employees.filter(e => e.id !== id)
      })),
      
      // Leave Requests
      addLeaveRequest: (request) => set(state => ({
        leaveRequests: [...state.leaveRequests, { ...request, id: Date.now(), submittedAt: new Date().toISOString() }]
      })),
      approveLeaveRequest: (id) => set(state => ({
        leaveRequests: state.leaveRequests.map(r => r.id === id ? {...r, status: 'approved'} : r)
      })),
      rejectLeaveRequest: (id) => set(state => ({
        leaveRequests: state.leaveRequests.map(r => r.id === id ? {...r, status: 'rejected'} : r)
      })),

      // Claims
      addClaim: (claim) => set(state => ({
        claims: [...state.claims, { ...claim, id: Date.now(), submittedAt: new Date().toISOString() }]
      })),
      approveClaim: (id) => set(state => ({
        claims: state.claims.map(c => c.id === id ? {...c, status: 'approved'} : c)
      })),
      rejectClaim: (id) => set(state => ({
        claims: state.claims.map(c => c.id === id ? {...c, status: 'rejected'} : c)
      })),

      // Payments
      addPayment: (payment) => set(state => ({
        payments: [...state.payments, { ...payment, id: Date.now(), submittedAt: new Date().toISOString(), approvalHistory: [] }]
      })),
      approvePayment: (id, approverId) => set(state => ({
        payments: state.payments.map(p => {
          if (p.id === id) {
            const newHistory = [...(p.approvalHistory || []), { approverId, approvedAt: new Date().toISOString() }]
            const allApproved = newHistory.length === p.approvers.length
            return {...p, approvalHistory: newHistory, status: allApproved ? 'approved' : 'pending'}
          }
          return p
        })
      })),
      rejectPayment: (id) => set(state => ({
        payments: state.payments.map(p => p.id === id ? {...p, status: 'rejected'} : p)
      })),

      // IT Requests
      addITRequest: (request) => set(state => ({
        itRequests: [...state.itRequests, { ...request, id: Date.now(), submittedAt: new Date().toISOString() }]
      })),
      resolveITRequest: (id) => set(state => ({
        itRequests: state.itRequests.map(r => r.id === id ? {...r, status: 'resolved'} : r)
      })),
      closeITRequest: (id) => set(state => ({
        itRequests: state.itRequests.map(r => r.id === id ? {...r, status: 'closed'} : r)
      })),

      // Settings
      updateSettings: (settings) => set(state => ({
        settings: { ...state.settings, ...settings }
      })),

      // Helpers
      getEmployeeName: (id) => {
        const emp = get().employees.find(e => e.id === id)
        return emp?.name || 'Unknown'
      },
      getDaysUntilDeadline: (deadline) => {
        const now = new Date()
        const dead = new Date(deadline)
        const days = Math.ceil((dead - now) / (1000 * 60 * 60 * 24))
        return days
      },
      getUrgencyColor: (days) => {
        if (days < 1) return 'bg-red-900 text-red-300'
        if (days <= 3) return 'bg-orange-900 text-orange-300'
        if (days <= 7) return 'bg-yellow-900 text-yellow-300'
        return 'bg-green-900 text-green-300'
      }
    }),
    { name: 'rikatec-app-store' }
  )
)
