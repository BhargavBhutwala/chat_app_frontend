import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import chatIcon from '../assets/chat.png';
import { useChatContext } from '../context/ChatContext';
import { callCreateRoom, callJoinRoom } from '../services/RoomService';

const CreateJoinChat = () => {
  const [detail, setDetail] = useState({
    name: '',
    roomId: '',
  });

  const {
    roomId,
    setRoomId,
    currentUser,
    setCurrentUser,
    connected,
    setConnected,
  } = useChatContext();

  const navigate = useNavigate();

  function handleFormInputChange(event) {
    setDetail({
      ...detail,
      [event.target.name]: event.target.value,
    });
  }

  function validateForm() {
    if (detail.name === '' || detail.roomId === '') {
      toast.error('Please enter missing details');
      return false;
    }
    return true;
  }

  async function joinRoom() {
    if (validateForm()) {
      // join room
      // console.log(detail);

      try {
        const result = await callJoinRoom(detail.roomId);
        //   console.log(result);

        toast.success('Joining Room...', {
          duration: 2000,
        });

        setRoomId(detail.roomId);
        setCurrentUser(detail.name);
        setConnected(true);

        // forward to room page
        navigate('/chat');
      } catch (error) {
        console.log(error);
        if (error.response.status === 400) {
          toast.error('Room does not exists!', {
            duration: 2000,
          });
        } else {
          toast.error('Failed to create room', {
            duration: 2000,
          });
        }
      }
    }
  }

  async function createRoom() {
    if (validateForm()) {
      // create room
      // console.log(detail);

      // call api to create room
      try {
        const result = await callCreateRoom(detail.roomId);
        //   console.log(result);
        toast.success('Room created successfully', {
          duration: 2000,
        });

        setRoomId(detail.roomId);
        setCurrentUser(detail.name);
        setConnected(true);

        // forward to room page
        navigate('/chat');
      } catch (error) {
        console.log(error);
        if (error.response.status === 400) {
          toast.error('Room already exists!', {
            duration: 2000,
          });
        } else {
          toast.error('Failed to create room', {
            duration: 2000,
          });
        }
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md dark:bg-gray-800 shadow p-8 rounded-lg">
        <div>
          <img src={chatIcon} className="w-24 mx-auto mb-3"></img>
        </div>

        <h1 className="text-2xl font-semibold text-center mt-5">
          Create/Join Chat Room
        </h1>
        <div className="mt-6">
          <form>
            <div className="mb-5">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your name
              </label>
              <input
                type="text"
                id="name"
                onChange={handleFormInputChange}
                name="name"
                value={detail.name}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="roomId"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Room ID
              </label>
              <input
                type="text"
                id="roomId"
                onChange={handleFormInputChange}
                name="roomId"
                value={detail.roomId}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter room ID"
                required
              />
            </div>
            <div className="mt-6 justify-center gap-2 flex">
              <button
                type="button"
                onClick={joinRoom}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Join Room
              </button>
              <button
                type="button"
                onClick={createRoom}
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Create Room
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateJoinChat;
