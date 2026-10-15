'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { adminLoginSchema } from '@/lib/validations'

export async function signIn(formData: unknown): Promise<{ error: string } | never> {
  const parsed = adminLoginSchema.safeParse(formData)
  if (!parsed.success) {
    const msg = parsed.error.issues[0]?.message ?? 'Invalid credentials.'
    return { error: msg }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email:    parsed.data.email,
    password: parsed.data.password,
  })

  if (error) {
    // Never expose raw Supabase auth error details
    return { error: 'Invalid email or password. Please try again.' }
  }

  redirect('/admin/dashboard')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/admin/login')
}
