/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // デプロイ時のみコメントを外す
    images: {
        domains: [
            'placehold.jp',
            'firebasestorage.googleapis.com',
        ],
    },
}

module.exports = nextConfig
