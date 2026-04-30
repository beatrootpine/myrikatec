import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  user: { id: 'demo-user-123', email: 'demo@example.com' },
  profile: { full_name: 'Demo User', department: 'Sales', role: { name: 'employee' } },
  role: 'employee',
  loading: false,

  initAuth: async () => {
    // Demo - no actual auth
    set({ loading: false })
  },

  signOut: () => {
    set({ user: null, profile: null, role: null })
    window.location.href = '/login'
  },

  demoSignIn: () => {
    set({ 
      user: { id: 'demo-user-123', email: 'demo@example.com' },
      profile: { full_name: 'Demo User', department: 'Sales', role: { name: 'employee' } },
      role: 'employee'
    })
  }
}))
