import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {};

// Pas d'options → TypeScript valide
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
