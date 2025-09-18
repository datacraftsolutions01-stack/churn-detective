import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VC Briefing',
  description: 'Generate a concise 1-page VC brief from a pitch deck.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 py-10">
          {children}
        </div>
      </body>
    </html>
  );
}

