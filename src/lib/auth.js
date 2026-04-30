import { create } from 'zustand'
import { supabase } from './supabase'

export const useAuthStore = create((set) => ({
  user: null,
  profile: null,
  role: null,
  loading: true,

  initAuth: async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (session?.user) {
      const { data } = await supabase.from('profiles').select('*, role:roles(name)').eq('id', session.user.id).single()
      set({ user: session.user, profile: data, role: data?.role?.name, loading: false })
    } else {
      set({ loading: false })
    }
  },

  signOut: async () => {
    await supabase.auth.signOut()
    set({ user: null, profile: null, role: null })
  }
}))
