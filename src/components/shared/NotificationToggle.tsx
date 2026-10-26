import React, { useState, useEffect } from 'react';
import { requestNotificationPermission, unregisterDevice } from '../../services/notificationService';
import { Bell, BellOff } from 'lucide-react';

export const NotificationToggle: React.FC = () => {
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);

  useEffect(() => {
    if ('Notification' in window) {
      setPermissionGranted(Notification.permission === 'granted');
    }
  }, []);

  const handleToggle = async () => {
    if (permissionGranted) {
      // In a real app, you might want to call unregisterDevice here to stop sending pushes, 
      // although browser revoking is the ultimate stop.
      await unregisterDevice();
      setPermissionGranted(false);
      // Note: we can't programmatically set Notification.permission back to 'default', 
      // the user has to do it in browser settings.
      alert('Notifications paused. To fully disable, change your browser site settings.');
    } else {
      const success = await requestNotificationPermission();
      if (success) {
        setPermissionGranted(true);
      } else {
        alert('Permission was denied or is unsupported.');
      }
    }
  };

  return (
    <button 
      onClick={handleToggle}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
        permissionGranted 
          ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {permissionGranted ? <Bell size={18} /> : <BellOff size={18} />}
      {permissionGranted ? 'Notifications Enabled' : 'Enable Notifications'}
    </button>
  );
};
