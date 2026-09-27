# AstroJyotish — Vedic Astrology Website

A full-stack astrology business website built with Next.js 14, TypeScript, Tailwind CSS, and Supabase.

## Features

- Home page with hero section, services, testimonials, and featured products
- About page with astrologer information and experience
- Shop page for astrology services and products
- Appointment booking with date and time selection
- Real-time availability for appointment slots
- Contact form with Supabase database storage
- Secure admin login
- Admin dashboard
- Appointment management
- Product management with CRUD operations
- Contact message management
- Supabase Row Level Security (RLS)
- Responsive dark cosmic design
- Vercel deployment

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase PostgreSQL
- **Authentication:** Supabase Auth
- **Validation:** Zod
- **Forms:** React Hook Form
- **Icons:** Lucide React
- **Deployment:** Vercel

## Pages

### Public Pages

| Page | Route |
|---|---|
| Home | `/` |
| About | `/about` |
| Shop / Services | `/shop` |
| Appointment Booking | `/appointment` |
| Contact | `/contact` |

### Admin Pages

| Page | Route |
|---|---|
| Admin Login | `/admin/login` |
| Dashboard | `/admin/dashboard` |
| Appointments | `/admin/appointments` |
| Products | `/admin/products` |
| Messages | `/admin/messages` |

## Project Structure

```text
astrologer-website/
├── src/
│   ├── app/
│   │   ├── about/
│   │   ├── admin/
│   │   ├── api/
│   │   ├── appointment/
│   │   ├── contact/
│   │   └── shop/
│   │
│   ├── components/
│   │   ├── admin/
│   │   ├── appointment/
│   │   ├── contact/
│   │   ├── layout/
│   │   ├── shop/
│   │   └── ui/
│   │
│   └── lib/
│
├── supabase/
│   └── migrations/
│
├── public/
├── .env.local
├── .gitignore
├── next.config.mjs
├── package.json
├── tailwind.config.ts
└── README.md
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root of the project.

Add:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Get the Supabase values from:

**Supabase Dashboard → Settings → API**

> Never commit `.env.local` to GitHub.
>
> Never expose `SUPABASE_SERVICE_ROLE_KEY` in frontend code or prefix it with `NEXT_PUBLIC_`.

### 3. Set Up Supabase

Open your Supabase project and go to:

**Supabase Dashboard → SQL Editor**

Run the migration files in this order:

```text
supabase/migrations/001_create_appointments.sql
supabase/migrations/002_create_products.sql
supabase/migrations/003_create_contact_messages.sql
```

Then run:

```sql
GRANT SELECT, INSERT, UPDATE, DELETE
ON public.appointments
TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE
ON public.products
TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE
ON public.contact_messages
TO service_role;
```

### 4. Create an Admin User

Go to:

**Supabase Dashboard → Authentication → Users**

Create a user with an email and password.

Use these credentials to log in to the admin portal:

```text
/admin/login
```

### 5. Run the Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

If port `3000` is already in use, Next.js will use another available port.

## Appointment Booking

The appointment booking flow works as follows:

1. Select a service.
2. Select a date.
3. Select an available time slot.
4. Enter customer details.
5. Submit the appointment.
6. View the booking confirmation.

Already booked time slots are unavailable.

When a user selects **Book Now** from the Shop page, the selected service is automatically passed to the appointment page.

## Admin Portal

The admin portal allows authorized users to:

- View dashboard information
- View appointments
- Update appointment status
- Add products
- Edit products
- Delete products
- View contact messages
- Update message status

### Appointment Statuses

- Pending
- Confirmed
- Completed
- Cancelled

### Contact Message Statuses

- Unread
- Read
- Replied

## Database

The application uses three main Supabase tables.

### Appointments

Stores customer appointment information.

- Name
- Email
- Phone
- Service
- Appointment date
- Appointment time
- Status
- Notes
- Created date

### Products

Stores astrology services and products.

- Name
- Description
- Price
- Image URL
- Category
- Active status
- Created date
- Updated date

### Contact Messages

Stores messages submitted through the contact form.

- Name
- Email
- Message
- Status
- Created date

## Security

- Supabase Authentication protects the admin portal.
- Row Level Security (RLS) is enabled.
- Admin routes are protected.
- The Supabase service-role key is used only on the server.
- `.env.local` is excluded from Git.
- User input is validated before database operations.

## Design

The website uses a modern cosmic astrology design featuring:

- Dark navy and black backgrounds
- Purple cosmic gradients
- Gold and orange accents
- Astrology-themed visuals
- Serif headings
- Rounded buttons and cards
- Responsive layouts
- Mobile-friendly design

## Payments

No payment gateway is currently included.

The Shop page displays astrology services and products. Users can select a service and continue to the appointment booking process.

## Local Production Build

To create a production build:

```bash
npm run build
```

To run the production build locally:

```bash
npm start
```

## Deployment

The website is deployed using Vercel.

### Vercel Environment Variables

Add the following environment variables in the Vercel project settings:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_SITE_URL
```

For production, set `NEXT_PUBLIC_SITE_URL` to the live website URL.

## Live Website

**AstroJyotish:**  
https://astrologerwebsite-eight.vercel.app

## Testing Checklist

Before deployment or major updates, verify:

- [ ] Home page loads correctly
- [ ] About page loads correctly
- [ ] Shop page loads correctly
- [ ] Contact form works
- [ ] Appointment booking works
- [ ] Service selection works
- [ ] Booked time slots are unavailable
- [ ] Shop "Book Now" selects the correct service
- [ ] Appointment is saved in Supabase
- [ ] Admin login works
- [ ] Admin dashboard works
- [ ] Appointment management works
- [ ] Product CRUD works
- [ ] Contact messages appear in admin
- [ ] Logout works
- [ ] Mobile layout works
- [ ] Production build succeeds

## Future Improvements

- Online payment integration
- Email appointment notifications
- WhatsApp notifications
- Calendar integration
- Customer accounts
- Appointment rescheduling
- PDF astrology report generation
- Advanced admin analytics

## License

This project was created as part of an internship project.
