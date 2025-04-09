import { httpClient } from '../config/AxiosHelper';

export async function callCreateRoom(roomDetails) {
  const result = (
    await httpClient.post('/', roomDetails, {
      headers: {
        'Content-Type': 'text/plain',
      },
    })
  ).data;
  return result;
}

export async function callJoinRoom(roomId) {
  const result = (await httpClient.request(`/${roomId}`)).data;
  return result;
}

export async function getMessages(roomId, size = 10, page = 0) {
  const result = (
    await httpClient.get(`/${roomId}/messages?page=${page}&size=${size}`)
  ).data;
  return result;
}
