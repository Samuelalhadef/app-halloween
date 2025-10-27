'use client';

import { useState, useEffect } from 'react';

interface Notification {
  _id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  createdAt: string;
}

export default function GlobalNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [displayedIds, setDisplayedIds] = useState<Set<string>>(new Set());

  // Fonction pour récupérer les notifications
  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/notifications');
      if (response.ok) {
        const data = await response.json();
        const newNotifications = data.notifications.filter(
          (notif: Notification) => !displayedIds.has(notif._id)
        );

        if (newNotifications.length > 0) {
          setNotifications((prev) => [...prev, ...newNotifications]);
          setDisplayedIds((prev) => {
            const newSet = new Set(prev);
            newNotifications.forEach((notif: Notification) => newSet.add(notif._id));
            return newSet;
          });

          // Retirer les notifications après 5 secondes
          newNotifications.forEach((notif: Notification) => {
            setTimeout(() => {
              setNotifications((prev) => prev.filter((n) => n._id !== notif._id));
            }, 5000);
          });
        }
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des notifications:', error);
    }
  };

  // Polling toutes les 2 secondes
  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 2000);
    return () => clearInterval(interval);
  }, [displayedIds]);

  // Fermer manuellement une notification
  const closeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n._id !== id));
  };

  // Couleurs selon le type
  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-900/90 border-green-500 text-green-100';
      case 'warning':
        return 'bg-yellow-900/90 border-yellow-500 text-yellow-100';
      case 'error':
        return 'bg-red-900/90 border-red-500 text-red-100';
      default:
        return 'bg-blue-900/90 border-blue-500 text-blue-100';
    }
  };

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-md">
      {notifications.map((notification, index) => (
        <div
          key={notification._id}
          className={`border-2 rounded-lg p-4 shadow-2xl backdrop-blur-sm animate-slide-in ${getTypeStyles(
            notification.type
          )}`}
          style={{
            animation: 'slideIn 0.3s ease-out',
            animationDelay: `${index * 0.1}s`,
          }}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <p className="font-inter text-sm font-semibold leading-relaxed">
                {notification.message}
              </p>
            </div>
            <button
              onClick={() => closeNotification(notification._id)}
              className="text-white/80 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      ))}

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
