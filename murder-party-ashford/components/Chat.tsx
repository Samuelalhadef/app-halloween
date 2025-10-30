'use client';

import { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  userId: string;
  username: string;
  content: string;
  isValidated: boolean;
  validatedBy?: string;
  pointsAwarded: number;
  createdAt: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fonction pour récupérer les messages
  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/messages');
      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des messages:', error);
    }
  };

  // Fonction pour récupérer l'utilisateur actuel
  const fetchCurrentUser = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const data = await response.json();
        setCurrentUser(data.user);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', error);
    }
  };

  // Charger l'utilisateur et les messages au démarrage
  useEffect(() => {
    fetchCurrentUser();
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, []);

  // Scroll automatique vers le bas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Envoyer un message
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newMessage.trim() || isLoading) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newMessage }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Erreur lors de l\'envoi du message');
        setIsLoading(false);
        return;
      }

      // Réinitialiser le champ et recharger les messages
      setNewMessage('');
      await fetchMessages();
    } catch (error) {
      setError('Erreur de connexion au serveur');
    } finally {
      setIsLoading(false);
    }
  };

  // Valider un message (admin uniquement)
  const handleValidateMessage = async (messageId: string) => {
    try {
      const response = await fetch(`/api/messages/${messageId}/validate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ points: 20 }),
      });

      if (response.ok) {
        await fetchMessages(); // Recharger les messages
      } else {
        const data = await response.json();
        setError(data.error || 'Erreur lors de la validation');
        setTimeout(() => setError(''), 3000);
      }
    } catch (error) {
      setError('Erreur de connexion au serveur');
      setTimeout(() => setError(''), 3000);
    }
  };

  // Formater la date
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full bg-secondary-bg border border-accent-gold/30 rounded-lg shadow-[0_0_20px_rgba(212,175,55,0.2)]">
      {/* Header */}
      <div className="px-6 py-4 border-b border-accent-gold/30">
        <h3 className="font-playfair text-2xl font-bold text-accent-gold flex items-center gap-2">
          💬 Discussion Collective
        </h3>
        <p className="text-text-muted font-inter text-sm mt-1">
          Partagez vos découvertes avec les autres enquêteurs
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 min-h-0">
        {messages.length === 0 ? (
          <div className="text-center text-text-muted font-inter py-8">
            <p>Aucun message pour le moment.</p>
            <p className="text-sm mt-2">Soyez le premier à partager une découverte !</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`bg-primary-bg/50 border rounded-lg p-4 hover:border-accent-gold/40 transition-colors ${
                message.isValidated ? 'border-green-500/50' : 'border-accent-gold/20'
              }`}
            >
              <div className="flex items-baseline justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-inter font-semibold text-accent-gold">
                    {message.username}
                  </span>
                  {message.isValidated && (
                    <span className="bg-green-500/20 border border-green-500 text-green-500 text-xs font-inter px-2 py-0.5 rounded-full">
                      ✓ Validé +{message.pointsAwarded}pts
                    </span>
                  )}
                </div>
                <span className="text-text-muted text-xs font-inter">
                  {formatTime(message.createdAt)}
                </span>
              </div>
              <p className="text-text-light font-inter text-sm leading-relaxed mb-3">
                {message.content}
              </p>
              {currentUser?.role === 'admin' && !message.isValidated && (
                <button
                  onClick={() => handleValidateMessage(message.id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs font-inter font-semibold transition-colors"
                >
                  Valider (+5 points)
                </button>
              )}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-6 border-t border-accent-gold/30">
        {error && (
          <div className="mb-4 p-3 bg-accent-crimson/20 border border-accent-crimson rounded-md">
            <p className="text-accent-crimson font-inter text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Écrivez votre message..."
            maxLength={500}
            disabled={isLoading}
            className="flex-1 bg-primary-bg border border-accent-gold/30 rounded-lg px-4 py-3 text-text-light font-inter focus:outline-none focus:border-accent-gold/60 focus:ring-1 focus:ring-accent-gold/60 transition-colors disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!newMessage.trim() || isLoading}
            className="bg-accent-gold hover:bg-accent-gold/80 text-primary-dark px-6 py-3 rounded-lg font-inter font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Envoi...' : 'Envoyer'}
          </button>
        </form>
        <p className="text-text-muted text-xs font-inter mt-2">
          {newMessage.length}/500 caractères
        </p>
      </div>
    </div>
  );
}
