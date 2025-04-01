/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_BASE_URL:
      process.env.NODE_ENV === 'production'
        ? 'https://steam-klon.vercel.app/' // Ana domain
        : 'http://localhost:3000',    // Yerel geliştirme ortamı
  }
};

export default nextConfig;