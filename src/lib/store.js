import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const initialData = {
  employees: [
    { id: 1, name: 'John Smith', email: 'john@rikatec.com', department: 'Sales', phone: '+27 11 123 4567' },
    { id: 2, name: 'Jane Doe', email: 'jane@rikatec.com', department: 'HR', phone: '+27 11 234 5678' },
    { id: 3, name: 'Bob Wilson', email: 'bob@rikatec.com', department: 'Finance', phone: '+27 11 345 6789' },
    { id: 4, name: 'Alice Johnson', email: 'alice@rikatec.com', department: 'Operations', phone: '+27 11 456 7890' },
  ],
  leaveRequests: [
    { id: 1, employeeId: 1, type: 'annual', days: 5, startDate: '2026-05-01', endDate: '2026-05-05', reason: 'Holiday', status: 'pending', submittedAt: new Date().toISOString() },
    { id: 2, employeeId: 2, type: 'sick', days: 1, startDate: '2026-04-30', endDate: '2026-04-30', reason: 'Medical', status: 'approved', submittedAt: new Date().toISOString() },
  ],
  claims: [
    { id: 1, employeeId: 1, meals: 1750, travel: 579.20, accommodation: 0, total: 2329.20, status: 'pending', submittedAt: new Date().toISOString() },
  ],
  payments: [
    { id: 1, employeeId: 2, supplier: 'ABC Supplies', amount: 5000, approvers: [3, 4], status: 'pending', submittedAt: new Date().toISOString() },
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
        payments: [...state.payments, { ...payment, id: Date.now(), submittedAt: new Date().toISOString() }]
      })),
      approvePayment: (id) => set(state => ({
        payments: state.payments.map(p => p.id === id ? {...p, status: 'approved'} : p)
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
      getEmployeeRequests: (employeeId) => {
        return {
          leaves: get().leaveRequests.filter(r => r.employeeId === employeeId),
          claims: get().claims.filter(c => c.employeeId === employeeId),
          payments: get().payments.filter(p => p.employeeId === employeeId),
          itRequests: get().itRequests.filter(r => r.employeeId === employeeId)
        }
      }
    }),
    { name: 'rikatec-app-store' }
  )
)
