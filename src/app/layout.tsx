import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { MobileNav } from '@/components/layout/MobileNav';
import { ToastContainer } from '@/components/layout/ToastContainer';
import { CommandPalette } from '@/components/layout/CommandPalette';
import { ParticleField } from '@/components/visuals/ParticleField';
import { CustomCursor } from '@/components/visuals/CustomCursor';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: 'VoxShield AI — Real-Time Voice Clone Detection & Impersonation Prevention',
  description:
    'Next-generation voice biometric security platform for Smart India Hackathon (SIH26104). Real-time neural vocoder anti-spoofing, speaker verification, and interactive liveness defense.',
  keywords: [
    'Voice Clone Detection',
    'Deepfake Audio Prevention',
    'AI Anti-Spoofing',
    'Speaker Verification',
    'Cybersecurity',
    'SIH 2026',
    'VoxShield AI',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable}`}
    >
      <body className="bg-background text-text-primary min-h-screen flex flex-col font-sans relative overflow-x-hidden">
        {/* Background Visual Elements */}
        <ParticleField />
        <CustomCursor />

        {/* Global Shell */}
        <Navbar />
        <div className="flex-1 flex w-full max-w-7xl mx-auto z-10 relative">
          <Sidebar />
          <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 pb-20 md:pb-8 overflow-y-auto">
            {children}
          </main>
        </div>

        <MobileNav />
        <ToastContainer />
        <CommandPalette />
      </body>
    </html>
  );
}
