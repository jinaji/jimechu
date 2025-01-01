import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: '지메추',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <Analytics />
        {children}
      </body>
    </html>
  );
}
