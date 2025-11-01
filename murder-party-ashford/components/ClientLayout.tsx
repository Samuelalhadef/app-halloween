'use client';

import { MusicProvider } from '@/contexts/MusicContext';
import BackgroundMusic from './BackgroundMusic';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <MusicProvider>
      {children}
      <BackgroundMusic />
    </MusicProvider>
  );
}
