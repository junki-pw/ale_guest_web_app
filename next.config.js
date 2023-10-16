/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'placehold.jp',
            'firebasestorage.googleapis.com',
        ],
    },
    swcMinify: false,
}

module.exports = nextConfig
