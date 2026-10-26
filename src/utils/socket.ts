import { io, Socket } from 'socket.io-client';
// getApiUrl is not needed if we rely on env vars or relative paths.

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

class SocketService {
  private socket: Socket | null = null;
  private currentStationId: string | null = null;

  connect() {
    if (!this.socket) {
      this.socket = io(SOCKET_URL, {
        withCredentials: true,
        transports: ['websocket', 'polling']
      });

      this.socket.on('connect', () => {
        console.log('Connected to real-time socket:', this.socket?.id);
        // Resubscribe if reconnected
        if (this.currentStationId) {
          this.subscribeToStation(this.currentStationId);
        }
      });

      this.socket.on('disconnect', () => {
        console.warn('Disconnected from real-time socket.');
      });
    }
    return this.socket;
  }

  getSocket(): Socket {
    if (!this.socket) {
      return this.connect();
    }
    return this.socket;
  }

  subscribeToStation(stationId: string) {
    if (this.currentStationId && this.currentStationId !== stationId) {
      this.unsubscribeFromStation(this.currentStationId);
    }
    this.currentStationId = stationId;
    this.getSocket().emit('subscribe:station', stationId);
  }

  unsubscribeFromStation(stationId: string) {
    if (this.currentStationId === stationId) {
      this.currentStationId = null;
    }
    this.getSocket().emit('unsubscribe:station', stationId);
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export const socketService = new SocketService();

import { useEffect, useState } from 'react';

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const s = socketService.connect();
    setSocket(s);
    return () => {
      // Don't disconnect on unmount if it's a global socket, but we can return it.
    };
  }, []);

  return socket;
};
