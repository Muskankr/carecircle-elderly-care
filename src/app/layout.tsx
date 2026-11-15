import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CareCircle — Intelligent Elderly Care & Medication Management Platform',
  description:
    'A unified, human-centred healthcare platform for seniors, family coordinators, and caregivers to manage medication adherence, doctor visits, and daily care routines.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body>{children}</body>
    </html>
  );
}
