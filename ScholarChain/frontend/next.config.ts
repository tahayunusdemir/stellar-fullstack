import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  webpack: (config, { isServer }) => {
    // Ignore node-specific modules when bundling for the browser
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      };
    }

    // Suppress warnings for Stellar SDK's native dependencies
    config.ignoreWarnings = [
      { module: /node_modules\/sodium-native/ },
      { module: /node_modules\/require-addon/ },
    ];

    return config;
  },
};

export default nextConfig;
