-- ─────────────────────────────────────────────────────────────────────────────
-- Migration 007 — multilingual products + shop orders (Razorpay)
-- Run in the Supabase SQL editor AFTER migrations 001–006.
-- ─────────────────────────────────────────────────────────────────────────────

-- 1. Product translations (English stays in name/description) ─────────────────
alter table public.products
  add column if not exists name_kn        text,
  add column if not exists name_te        text,
  add column if not exists description_kn text,
  add column if not exists description_te text;

-- 2. Orders ──────────────────────────────────────────────────────────────────
create table if not exists public.orders (
  id                   uuid           primary key default gen_random_uuid(),
  product_id           uuid           references public.products(id) on delete set null,
  product_name         text           not null,          -- snapshot (English)
  unit_price           numeric(10, 2) not null check (unit_price > 0),
  quantity             integer        not null check (quantity >= 1 and quantity <= 50),
  amount               numeric(10, 2) not null check (amount > 0),  -- INR, server-calculated
  customer_name        text           not null,
  customer_email       text           not null,
  customer_phone       text           not null,
  address              text           not null,
  payment_status       text           not null default 'pending',
  order_status         text           not null default 'new',
  razorpay_order_id    text           unique,
  razorpay_payment_id  text,
  paid_at              timestamptz,
  created_at           timestamptz    not null default now(),

  constraint orders_payment_status_check
    check (payment_status in ('pending', 'paid', 'failed')),
  constraint orders_order_status_check
    check (order_status in ('new', 'processing', 'shipped', 'delivered', 'cancelled'))
);

create index if not exists idx_orders_created on public.orders (created_at desc);
create index if not exists idx_orders_payment on public.orders (payment_status);

-- RLS: nobody reads/writes orders with the anon key. Only the service role
-- (server actions / route handlers) touches this table.
alter table public.orders enable row level security;
grant select, insert, update, delete on public.orders to service_role;

comment on table public.orders is
  'Shop orders. Amount is calculated server-side; paid via Razorpay (no COD).';
