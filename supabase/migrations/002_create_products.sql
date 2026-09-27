-- Migration 002 — products table
-- ─────────────────────────────────────────────────────────────────────────────

create table if not exists public.products (
  id          uuid        primary key default gen_random_uuid(),
  name        text        not null,
  description text        not null,
  price       numeric(10, 2) not null check (price > 0),
  image_url   text,
  category    text        not null,
  active      boolean     not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),

  constraint products_name_length
    check (char_length(name) >= 2 and char_length(name) <= 150),

  constraint products_category_check
    check (
      category in (
        'consultation',
        'report',
        'relationship',
        'career',
        'gemstone',
        'yantra',
        'rudraksha',
        'other'
      )
    )
);

create index if not exists idx_products_active
  on public.products (active);

create index if not exists idx_products_category
  on public.products (category);

-- RLS
alter table public.products enable row level security;

-- Public users may only view active products.
create policy "Public can view active products"
  on public.products
  for select
  to anon, authenticated
  using (active = true);

-- service_role manages products from the admin portal.
grant select, insert, update, delete
  on public.products
  to service_role;

comment on table public.products is
  'Astrology services / products displayed on the shop page.';