/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: [
            'placehold.jp',
            'firebasestorage.googleapis.com',
        ],
    },
    swcMinify: false,
}

module.exports = nextConfig
