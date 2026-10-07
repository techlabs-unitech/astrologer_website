-- ─────────────────────────────────────────────────────────────────────────────
-- Migration 001 — appointments table
-- Run this in the Supabase SQL editor or via the Supabase CLI.
-- ─────────────────────────────────────────────────────────────────────────────

-- Enable the pgcrypto extension for gen_random_uuid() if not already active.
-- (Supabase enables this by default; this is a safety net.)
create extension if not exists pgcrypto;

-- ─── Table ────────────────────────────────────────────────────────────────────

create table if not exists public.appointments (
  id               uuid        primary key default gen_random_uuid(),
  name             text        not null,
  email            text        not null,
  phone            text        not null,
  service          text        not null,
  appointment_date date        not null,
  appointment_time time        not null,
  status           text        not null default 'pending',
  notes            text,
  created_at       timestamptz not null default now(),

  -- Status must be one of the four allowed values
  constraint appointments_status_check
    check (status in ('pending', 'confirmed', 'completed', 'cancelled')),

  -- Basic sanity checks
  constraint appointments_name_length
    check (char_length(name) >= 2 and char_length(name) <= 100),

  constraint appointments_email_format
    check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),

  constraint appointments_phone_length
    check (char_length(phone) >= 7 and char_length(phone) <= 20)
);

-- ─── Indexes ──────────────────────────────────────────────────────────────────

-- General lookup by date (admin views, slot queries)
create index if not exists idx_appointments_date
  on public.appointments (appointment_date);

-- Lookup by email (future: user booking history)
create index if not exists idx_appointments_email
  on public.appointments (email);

-- ─── Partial unique index — duplicate slot protection ─────────────────────────
-- Two active (non-cancelled) appointments cannot share the same date + time.
-- Cancelled appointments free the slot for re-booking.

create unique index if not exists uq_appointments_active_slot
  on public.appointments (appointment_date, appointment_time)
  where status <> 'cancelled';

-- ─── Row Level Security ───────────────────────────────────────────────────────

alter table public.appointments enable row level security;

-- Public users may INSERT their own appointment.
-- They may NOT select, update, or delete any rows.
-- Admin access is handled separately in a later phase via a service-role
-- server action (not the anon key).

create policy "Public can insert appointments"
  on public.appointments
  for insert
  to anon, authenticated
  with check (true);

-- Intentionally no SELECT / UPDATE / DELETE policies for public/anon users.
-- Admins will use the service-role key server-side only.

-- ─── Privileges ───────────────────────────────────────────────────────────────
-- Grant the service_role Postgres role the privileges it needs.
-- The service_role JWT bypasses RLS, but the underlying Postgres role still
-- requires explicit GRANT to access the table.

grant select, insert, update, delete on public.appointments to service_role;

-- ─── Comments ─────────────────────────────────────────────────────────────────

comment on table public.appointments is
  'Customer appointment booking requests. Status lifecycle: pending → confirmed → completed or cancelled.';

comment on column public.appointments.appointment_date is
  'Local business date for the appointment (Asia/Kolkata assumed).';

comment on column public.appointments.appointment_time is
  'Local business time for the appointment, stored as TIME (HH:MM:SS).';

comment on column public.appointments.status is
  'pending | confirmed | completed | cancelled';
