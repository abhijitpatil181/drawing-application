import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const useWebSocket = (url: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socket = io(url);

    socket.on("connect", () => {
      console.log(`WebSocket connection established with id ${socket.id}`);
    });

    // Handle incoming messages
    socket.on("message", (message) => {
      console.log("Message received:", message);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });

    // Set socket in state
    setSocket(socket);
    return () => {
      socket.disconnect();
    };
  }, [url]);

  return { socket };
};

export default useWebSocket;
