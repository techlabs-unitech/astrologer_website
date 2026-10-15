-- Idempotent sample catalogue for local and initial deployments.
-- Existing products with the same name are left untouched.

insert into public.products (name, description, price, image_url, category, active)
select 'Rudraksha Mala', 'A traditional rudraksha mala for daily meditation, prayer, and mindful practice.', 899.00, 'https://images.unsplash.com/photo-1608403889289-8c5b6f2b5c8d?auto=format&fit=crop&w=900&q=80', 'rudraksha', true
where not exists (select 1 from public.products where name = 'Rudraksha Mala');

insert into public.products (name, description, price, image_url, category, active)
select 'Astrology Journal', 'A guided journal for recording chart insights, intentions, cycles, and personal reflections.', 499.00, 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=900&q=80', 'other', true
where not exists (select 1 from public.products where name = 'Astrology Journal');

insert into public.products (name, description, price, image_url, category, active)
select 'Vedic Astrology Book', 'A practical introduction to classical Jyotish concepts, chart reading, and planetary symbolism.', 799.00, 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=900&q=80', 'report', true
where not exists (select 1 from public.products where name = 'Vedic Astrology Book');

insert into public.products (name, description, price, image_url, category, active)
select 'Gemstone Bracelet', 'A carefully selected bracelet intended to complement personal spiritual and astrological practice.', 1299.00, 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=80', 'gemstone', true
where not exists (select 1 from public.products where name = 'Gemstone Bracelet');

insert into public.products (name, description, price, image_url, category, active)
select 'Puja Kit', 'A simple puja kit for creating a focused and respectful space for prayer and ritual.', 699.00, 'https://images.unsplash.com/photo-1604608672516-f1b9f6f6d7f9?auto=format&fit=crop&w=900&q=80', 'other', true
where not exists (select 1 from public.products where name = 'Puja Kit');

insert into public.products (name, description, price, image_url, category, active)
select 'Spiritual Diary', 'A durable daily diary for gratitude, meditation notes, intentions, and spiritual practice.', 399.00, 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=80', 'other', true
where not exists (select 1 from public.products where name = 'Spiritual Diary');
