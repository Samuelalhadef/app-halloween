import { redirect } from 'next/navigation';

export default function Home() {
  // Rediriger immédiatement vers la page de connexion
  redirect('/login');
}
