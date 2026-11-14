import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async rewrites() {
    return [
      {
        source: "/accounts/vouchers",
        destination: "/vouchers",
      },
      {
        source: "/accounts/general-ledger/vouchers",
        destination: "/general-ledger/vouchers",
      },
      {
        source: "/accounts/general-ledger/:path*",
        destination: "/general-ledger/:path*",
      },
      {
        source: "/accounts/general-ledger",
        destination: "/general-ledger",
      },
      {
        source: "/accounts/accounts-payable",
        destination: "/accounts-payable",
      },
      {
        source: "/accounts/accounts-receivable",
        destination: "/accounts-receivable",
      },
      {
        source: "/accounts/petty-cash",
        destination: "/petty-cash",
      },
      {
        source: "/accounts/loan-management",
        destination: "/loan-management",
      },
    ];
  },
};

export default nextConfig;
