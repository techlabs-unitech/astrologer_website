/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow any HTTPS image URL so admins can set product image_url
    // to any hosted image (Supabase Storage, Cloudinary, etc.)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

export default nextConfig
