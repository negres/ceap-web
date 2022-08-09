// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();
const path = require('path');
const Dotenv = require('dotenv-webpack');
const withBundleAnalyzer = require('@next/bundle-analyzer')({ enabled: process.env.ANALYZE === 'true' });

const basePath = '';

module.exports = withBundleAnalyzer({
  async headers() {
    return [{
      source: '/(.*)',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'deny',
        },
      ],
    }];
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  compile: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  swcMinify: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  /* eslint-disable no-param-reassign */
  webpack: (config) => {
    config.plugins = config.plugins || [];

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [{
        loader: '@svgr/webpack',
        options: {
          svgo: true,
          svgoConfig: { plugins: { removeViewBox: false } },
        },
      }],
    });

    config.plugins = [
      ...config.plugins,

      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true,
      }),
    ];

    return config;
  },
  basePath,
});
