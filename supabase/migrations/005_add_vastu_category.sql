-- Migration 005 — add 'vastu' as a valid product category
-- ─────────────────────────────────────────────────────────────────────────────

alter table public.products
  drop constraint if exists products_category_check;

alter table public.products
  add constraint products_category_check
  check (
    category in (
      'consultation',
      'report',
      'relationship',
      'career',
      'gemstone',
      'yantra',
      'rudraksha',
      'vastu',
      'other'
    )
  );
