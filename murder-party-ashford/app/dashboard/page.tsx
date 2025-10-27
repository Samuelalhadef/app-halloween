import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import Link from 'next/link';
import Button from '@/components/Button';

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-primary-bg">
      {/* Header */}
      <header className="border-b border-accent-gold/20 bg-primary-dark/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-6 flex justify-between items-center">
          <div>
            <h1 className="font-playfair text-3xl font-bold text-accent-gold">
              Murder Party Ashford
            </h1>
            <p className="text-text-gray mt-1 font-inter text-sm">
              Bienvenue, {user.username}
            </p>
          </div>
          <form action="/api/auth/logout" method="POST">
            <Button variant="outline" size="sm">
              Déconnexion
            </Button>
          </form>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="mb-12">
          <h2 className="font-playfair text-4xl font-bold text-text-light mb-4">
            Tableau de Bord
          </h2>
          <p className="text-text-gray font-inter text-lg">
            Le mystère du Manoir Ashford vous attend. Explorez les suspects, collectez les indices et résolvez l'enquête.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-secondary-bg border border-accent-gold/30 rounded-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent-gold/10 rounded-full flex items-center justify-center border border-accent-gold/30">
                <span className="text-2xl">🎭</span>
              </div>
              <div>
                <p className="text-text-muted font-inter text-sm">Suspects</p>
                <p className="text-accent-gold font-playfair text-3xl font-bold">8</p>
              </div>
            </div>
          </div>

          <div className="bg-secondary-bg border border-accent-gold/30 rounded-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent-gold/10 rounded-full flex items-center justify-center border border-accent-gold/30">
                <span className="text-2xl">🔍</span>
              </div>
              <div>
                <p className="text-text-muted font-inter text-sm">Indices découverts</p>
                <p className="text-accent-gold font-playfair text-3xl font-bold">0/12</p>
              </div>
            </div>
          </div>

          <div className="bg-secondary-bg border border-accent-gold/30 rounded-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent-gold/10 rounded-full flex items-center justify-center border border-accent-gold/30">
                <span className="text-2xl">⏱️</span>
              </div>
              <div>
                <p className="text-text-muted font-inter text-sm">Temps restant</p>
                <p className="text-accent-gold font-playfair text-3xl font-bold">∞</p>
              </div>
            </div>
          </div>
        </div>

        {/* Game Button - Highlighted */}
        <div className="mb-12">
          <Link href="/game">
            <div className="bg-gradient-to-r from-accent-gold/20 via-accent-burgundy/20 to-accent-crimson/20 border-2 border-accent-gold rounded-lg p-8 hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] transition-all duration-300 hover:border-accent-gold/80 cursor-pointer group text-center">
              <div className="flex items-center justify-center gap-6">
                <span className="text-6xl">🎮</span>
                <div>
                  <h2 className="font-playfair text-4xl font-bold text-accent-gold mb-2 group-hover:scale-105 transition-transform">
                    COMMENCER L'ENQUÊTE
                  </h2>
                  <p className="font-inter text-text-light">
                    Entrez dans l'interface de jeu principale avec chronomètre
                  </p>
                </div>
                <span className="text-4xl group-hover:translate-x-2 transition-transform">→</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Personnages */}
          <Link href="/characters">
            <div className="bg-secondary-bg border border-accent-gold/30 rounded-lg p-8 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300 hover:border-accent-gold/60 cursor-pointer group">
              <div className="w-16 h-16 bg-accent-gold/10 rounded-full flex items-center justify-center mb-6 border border-accent-gold/30 group-hover:bg-accent-gold/20 transition-colors">
                <span className="text-4xl">🎭</span>
              </div>
              <h3 className="font-playfair text-3xl font-bold text-accent-gold mb-4">
                Les Suspects
              </h3>
              <p className="text-text-gray font-inter leading-relaxed mb-4">
                Découvrez les 8 personnes présentes lors de cette soirée fatidique.
                Chacun cache des secrets qui pourraient les incriminer...
              </p>
              <div className="flex items-center text-accent-gold font-inter font-medium group-hover:gap-3 gap-2 transition-all">
                Explorer les personnages
                <span className="text-xl">→</span>
              </div>
            </div>
          </Link>

          {/* Indices */}
          <Link href="/clues">
            <div className="bg-secondary-bg border border-accent-gold/30 rounded-lg p-8 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300 hover:border-accent-gold/60 cursor-pointer group">
              <div className="w-16 h-16 bg-accent-gold/10 rounded-full flex items-center justify-center mb-6 border border-accent-gold/30 group-hover:bg-accent-gold/20 transition-colors">
                <span className="text-4xl">🔍</span>
              </div>
              <h3 className="font-playfair text-3xl font-bold text-accent-gold mb-4">
                Les Indices
              </h3>
              <p className="text-text-gray font-inter leading-relaxed mb-4">
                Collectez et analysez les indices disséminés dans le manoir.
                La vérité se cache dans les détails les plus insignifiants...
              </p>
              <div className="flex items-center text-accent-gold font-inter font-medium group-hover:gap-3 gap-2 transition-all">
                Consulter les indices
                <span className="text-xl">→</span>
              </div>
            </div>
          </Link>

          {/* Timeline */}
          <Link href="/timeline">
            <div className="bg-secondary-bg border border-accent-gold/30 rounded-lg p-8 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300 hover:border-accent-gold/60 cursor-pointer group">
              <div className="w-16 h-16 bg-accent-gold/10 rounded-full flex items-center justify-center mb-6 border border-accent-gold/30 group-hover:bg-accent-gold/20 transition-colors">
                <span className="text-4xl">📜</span>
              </div>
              <h3 className="font-playfair text-3xl font-bold text-accent-gold mb-4">
                Chronologie
              </h3>
              <p className="text-text-gray font-inter leading-relaxed mb-4">
                Reconstituez les événements de cette soirée tragique minute par minute.
                Qui était où et quand ?
              </p>
              <div className="flex items-center text-accent-gold font-inter font-medium group-hover:gap-3 gap-2 transition-all">
                Voir la chronologie
                <span className="text-xl">→</span>
              </div>
            </div>
          </Link>

          {/* Accusation */}
          <div className="bg-gradient-to-br from-accent-burgundy/20 to-accent-crimson/20 border border-accent-gold/40 rounded-lg p-8 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 hover:border-accent-gold/60">
            <div className="w-16 h-16 bg-accent-crimson/20 rounded-full flex items-center justify-center mb-6 border border-accent-crimson/50">
              <span className="text-4xl">⚖️</span>
            </div>
            <h3 className="font-playfair text-3xl font-bold text-text-light mb-4">
              Accusation Finale
            </h3>
            <p className="text-text-gray font-inter leading-relaxed mb-6">
              Prêt à démasquer le coupable ? Une fois votre accusation soumise,
              vous ne pourrez plus la modifier.
            </p>
            <Button variant="secondary" size="md" className="w-full" disabled>
              Faire une accusation
            </Button>
            <p className="text-text-muted font-inter text-xs text-center mt-3">
              Collectez plus d'indices avant d'accuser
            </p>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-12 bg-accent-gold/10 border border-accent-gold/30 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <span className="text-3xl">💡</span>
            <div>
              <h4 className="font-playfair text-xl font-bold text-accent-gold mb-2">
                Conseil d'enquête
              </h4>
              <p className="text-text-gray font-inter">
                Prenez des notes pendant votre enquête. Certains détails qui semblent
                insignifiants au début peuvent s'avérer cruciaux pour résoudre le mystère.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
