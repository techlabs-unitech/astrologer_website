/**
 * Service-role Supabase client — SERVER ONLY.
 *
 * This module MUST NOT be imported from any client component or browser bundle.
 * It uses SUPABASE_SERVICE_ROLE_KEY (no NEXT_PUBLIC_ prefix) which is only
 * available in the Node.js runtime.  The service-role key bypasses RLS and
 * is reserved for trusted server-side operations such as reading appointment
 * availability without exposing private user data.
 *
 * Only call createServiceClient() from:
 *   - Route Handlers  (src/app/api/*)
 *   - Server Actions  ('use server')
 *   - Server Components
 */

import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

export function createServiceClient() {
  const url    = process.env.NEXT_PUBLIC_SUPABASE_URL
  const secret = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !secret) {
    throw new Error(
      '[createServiceClient] NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not set. ' +
      'Add both to .env.local.'
    )
  }

  // auth.persistSession: false — this is a server-side client, no session needed.
  // global.headers explicitly sets the Authorization to the service-role JWT,
  // ensuring RLS is bypassed even if the supabase-js auth layer attempts to
  // override the key with a user session.
  return createClient<Database>(url, secret, {
    auth: {
      persistSession:   false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
    global: {
      headers: {
        Authorization: `Bearer ${secret}`,
      },
    },
  })
}
