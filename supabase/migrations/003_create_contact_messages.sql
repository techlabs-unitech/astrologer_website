-- ─────────────────────────────────────────────────────────────────────────────
-- Migration 003 — contact_messages table
-- ─────────────────────────────────────────────────────────────────────────────

create table if not exists public.contact_messages (
  id         uuid        primary key default gen_random_uuid(),
  name       text        not null,
  email      text        not null,
  phone      text,
  message    text        not null,
  status     text        not null default 'unread',
  created_at timestamptz not null default now(),

  constraint contact_messages_status_check
    check (status in ('unread', 'read', 'resolved')),
  constraint contact_messages_name_length
    check (char_length(name) >= 2 and char_length(name) <= 100),
  constraint contact_messages_email_format
    check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  constraint contact_messages_message_length
    check (char_length(message) >= 10)
);

create index if not exists idx_contact_messages_status
  on public.contact_messages (status);

create index if not exists idx_contact_messages_created
  on public.contact_messages (created_at desc);

-- ─── RLS ──────────────────────────────────────────────────────────────────────
alter table public.contact_messages enable row level security;

-- Public users may only INSERT (submit the contact form).
create policy "Public can submit contact messages"
  on public.contact_messages for insert
  to anon, authenticated
  with check (true);

-- service_role manages all CRUD (admin portal).
grant select, insert, update, delete on public.contact_messages to service_role;

comment on table public.contact_messages is
  'Contact form submissions. Status: unread → read → resolved.';
