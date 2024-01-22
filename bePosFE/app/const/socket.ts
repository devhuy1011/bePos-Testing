export const DOMAIN = process.env.NEXT_PUBLIC_REACT_APP_SOCKET_SERVER;

export const EVENT = {
  AUTH: `AUTH`, //Xác thực
  DISCONNECT: `DISCONNECT`,
  STREAM_RESPONSE: `STREAM_RESPONSE`, //stream tin nhắn
};
export const ROOM = {
  USER: ({ userId, roomId }: any) => `GPT-${userId}-${roomId}`,
};
