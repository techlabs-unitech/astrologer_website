-- Migration 006 — seed real, market-researched products
-- ─────────────────────────────────────────────────────────────────────────────
-- Sourced from a market survey of comparable Vedic-astrology / spiritual
-- retailers (prices and descriptions adapted to this catalogue).
-- Idempotent: existing products with the same name are left untouched.
-- image_url is intentionally left NULL — the reference photos found during
-- sourcing belong to other sellers' own listings, so they are not reused
-- here. The shop UI already renders a category icon card when no image is
-- set; replace with your own product photography via the Admin → Products
-- panel whenever it's ready.

insert into public.products (name, description, price, image_url, category, active)
select 'Aries Zodiac Gemstone Bracelet', 'A semi-precious gemstone bracelet for Aries (Mesh Rashi), ruled by Mars. Traditionally worn to boost energy, courage and decisive action, and for protection from the evil eye. Lab-tested and Vedic-consecrated.', 650.00, null, 'gemstone', true
where not exists (select 1 from public.products where name = 'Aries Zodiac Gemstone Bracelet');

insert into public.products (name, description, price, image_url, category, active)
select 'Taurus Zodiac Gemstone Bracelet', 'A semi-precious gemstone bracelet for Taurus (Vrishabh Rashi), ruled by Venus. Traditionally worn to relieve stress, support career growth and offer protection from the evil eye. Lab-tested and Vedic-consecrated.', 650.00, null, 'gemstone', true
where not exists (select 1 from public.products where name = 'Taurus Zodiac Gemstone Bracelet');

insert into public.products (name, description, price, image_url, category, active)
select 'Gemini Zodiac Gemstone Bracelet', 'A semi-precious gemstone bracelet for Gemini (Mithun Rashi), ruled by Mercury. Traditionally worn to enhance communication, mental clarity and balanced energy. Lab-tested and Vedic-consecrated.', 650.00, null, 'gemstone', true
where not exists (select 1 from public.products where name = 'Gemini Zodiac Gemstone Bracelet');

insert into public.products (name, description, price, image_url, category, active)
select 'Cancer Zodiac Gemstone Bracelet', 'A semi-precious gemstone bracelet for Cancer (Kark Rashi), ruled by the Moon. Traditionally worn for emotional balance, relationship harmony and protection from the evil eye. Lab-tested and Vedic-consecrated.', 650.00, null, 'gemstone', true
where not exists (select 1 from public.products where name = 'Cancer Zodiac Gemstone Bracelet');

insert into public.products (name, description, price, image_url, category, active)
select 'Leo Zodiac Gemstone Bracelet', 'A semi-precious gemstone bracelet for Leo (Simha Rashi), ruled by the Sun. Traditionally worn to boost confidence, creativity and physical vitality. Lab-tested and Vedic-consecrated.', 650.00, null, 'gemstone', true
where not exists (select 1 from public.products where name = 'Leo Zodiac Gemstone Bracelet');

insert into public.products (name, description, price, image_url, category, active)
select 'Virgo Zodiac Gemstone Bracelet', 'A semi-precious gemstone bracelet for Virgo (Kanya Rashi), ruled by Mercury. Traditionally worn to ease stress and anxiety and build a protective shield. Lab-tested and Vedic-consecrated.', 650.00, null, 'gemstone', true
where not exists (select 1 from public.products where name = 'Virgo Zodiac Gemstone Bracelet');

insert into public.products (name, description, price, image_url, category, active)
select 'Libra Zodiac Gemstone Bracelet', 'A semi-precious gemstone bracelet for Libra (Tula Rashi), ruled by Venus. Traditionally worn to support relationships, intellect and mental-physical balance. Lab-tested and Vedic-consecrated.', 650.00, null, 'gemstone', true
where not exists (select 1 from public.products where name = 'Libra Zodiac Gemstone Bracelet');

insert into public.products (name, description, price, image_url, category, active)
select 'Scorpio Zodiac Gemstone Bracelet', 'A semi-precious gemstone bracelet for Scorpio (Vrishchik Rashi), ruled by Mars. Traditionally worn to build confidence, ease stress and form a protective shield. Lab-tested and Vedic-consecrated.', 650.00, null, 'gemstone', true
where not exists (select 1 from public.products where name = 'Scorpio Zodiac Gemstone Bracelet');

insert into public.products (name, description, price, image_url, category, active)
select 'Sagittarius Zodiac Gemstone Bracelet', 'A semi-precious gemstone bracelet for Sagittarius (Dhanu Rashi), ruled by Jupiter. Traditionally worn to encourage optimism, wisdom and good fortune in travel and learning. Lab-tested and Vedic-consecrated.', 650.00, null, 'gemstone', true
where not exists (select 1 from public.products where name = 'Sagittarius Zodiac Gemstone Bracelet');

insert into public.products (name, description, price, image_url, category, active)
select 'Capricorn Zodiac Gemstone Bracelet', 'A semi-precious gemstone bracelet for Capricorn (Makar Rashi), ruled by Saturn. Traditionally worn to sharpen focus and shield against negativity. Lab-tested and Vedic-consecrated.', 650.00, null, 'gemstone', true
where not exists (select 1 from public.products where name = 'Capricorn Zodiac Gemstone Bracelet');

insert into public.products (name, description, price, image_url, category, active)
select 'Aquarius Zodiac Gemstone Bracelet', 'A semi-precious gemstone bracelet for Aquarius (Kumbh Rashi), ruled by Saturn. Traditionally worn to boost clarity, spiritual awareness and inner peace. Lab-tested and Vedic-consecrated.', 650.00, null, 'gemstone', true
where not exists (select 1 from public.products where name = 'Aquarius Zodiac Gemstone Bracelet');

insert into public.products (name, description, price, image_url, category, active)
select 'Pisces Zodiac Gemstone Bracelet', 'A semi-precious gemstone bracelet for Pisces (Meen Rashi), ruled by Jupiter. Traditionally worn to boost vitality, confidence and good fortune. Lab-tested and Vedic-consecrated.', 650.00, null, 'gemstone', true
where not exists (select 1 from public.products where name = 'Pisces Zodiac Gemstone Bracelet');

insert into public.products (name, description, price, image_url, category, active)
select 'Copper Sree Yantra Pyramid', 'A handcrafted 1-inch copper Sree Yantra (Shri Meru) used in Vastu and puja for wealth and prosperity. Placed in the northeast corner of a home or workspace as a focus for abundance and positive energy.', 1089.00, null, 'yantra', true
where not exists (select 1 from public.products where name = 'Copper Sree Yantra Pyramid');

insert into public.products (name, description, price, image_url, category, active)
select 'Kirtimukha Vastu Wall Hanging', 'A brass Kirtimukha ("Face of Glory") wall hanging — a traditional protective motif believed to ward off the evil eye and negative energy (drishti dosha). Hung above entrances or pooja spaces.', 10349.00, null, 'vastu', true
where not exists (select 1 from public.products where name = 'Kirtimukha Vastu Wall Hanging');

insert into public.products (name, description, price, image_url, category, active)
select 'Vastu Shanti Remedy Chakra', 'A wall-mounted Vastu remedy chakra used to correct minor Vastu dosha in a home or office without any structural changes, placed according to directional (disha) guidelines.', 1639.00, null, 'vastu', true
where not exists (select 1 from public.products where name = 'Vastu Shanti Remedy Chakra');

insert into public.products (name, description, price, image_url, category, active)
select 'Herbal Dhoop Sticks (Pack of 20)', 'All-natural herbal dhoop made with chaste tree, tulsi and neem, used for daily puja, meditation and space purification. Comes with a simple base stand.', 50.00, null, 'other', true
where not exists (select 1 from public.products where name = 'Herbal Dhoop Sticks (Pack of 20)');
