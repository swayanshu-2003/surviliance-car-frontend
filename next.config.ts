import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig:any = {
  reactStrictMode: true,


  // Add WebAssembly support
  webpack: (config:any, { isServer }:any) => {
    // Enable WebAssembly
    config.cache = false;
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    };

    // Prevent node-specific modules from being bundled on the client side
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        crypto: false,
        path: false,
        process: false,
      };
    }

    return config;
  },
};

export default withPWA({
  dest: 'public',
})(nextConfig);