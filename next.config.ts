import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: ['./src/styles'],
  },
  //  importações de pacotes:
  experimental: {
    optimizePackageImports: ['icon-library'],
    
    //desativar pacote de agrupamento caso queira
    //serverExternalPackages: ['nome-do-pacote'],

   },
};

export default withAnalyzer(nextConfig);
