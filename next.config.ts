import type { NextConfig } from 'next';

const securityHeaders=[
  {key:'X-Content-Type-Options',value:'nosniff'},
  {key:'X-Frame-Options',value:'DENY'},
  {key:'Referrer-Policy',value:'strict-origin-when-cross-origin'},
  {key:'Permissions-Policy',value:'camera=(), microphone=(), geolocation=(), payment=()'},
  {key:'Content-Security-Policy',value:`default-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; object-src 'none'; img-src 'self' data: blob:; font-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'${process.env.NODE_ENV==='development'?" 'unsafe-eval'":''}; frame-src https://www.youtube.com https://www.youtube-nocookie.com; connect-src 'self'${process.env.NODE_ENV==='development'?' ws:':''};${process.env.NODE_ENV==='production'?' upgrade-insecure-requests;':''}`},
  {key:'Strict-Transport-Security',value:'max-age=63072000; includeSubDomains; preload'}
];

const nextConfig:NextConfig={poweredByHeader:false,compress:true,images:{formats:['image/avif','image/webp']},async headers(){return[{source:'/:path*',headers:securityHeaders}]}};
export default nextConfig;
