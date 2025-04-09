import { Client } from '@stomp/stompjs';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { IoAttachSharp, IoSend } from 'react-icons/io5';
import { useNavigate } from 'react-router';
import SockJS from 'sockjs-client';
import { useChatContext } from '../context/ChatContext';
import { getMessages } from '../services/RoomService';
import Navbar from './Navbar';

const ChatPage = () => {
  const {
    roomId,
    currentUser,
    connected,
    setConnected,
    setRoomId,
    setCurrentUser,
  } = useChatContext();

  console.log(roomId);
  console.log(currentUser);
  console.log(connected);

  const navigate = useNavigate();

  useEffect(() => {
    if (!connected) {
      navigate('/');
    }
  }, [roomId, currentUser, connected]);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  //   const inputRef = useRef(null);
  const chatBoxRef = useRef(null);
  const [stompClient, setStompClient] = useState(null);

  // page init: load old messages also
  useEffect(() => {
    async function loadMessages() {
      if (!roomId || roomId.trim() === '') {
        console.log('RoomId not found');
        return;
      }
      try {
        const messages = await getMessages(roomId);
        console.log(messages);
        setMessages(messages);
      } catch (error) {
        console.log(error);
      }
    }

    if (connected) {
      loadMessages();
    }
  }, [roomId]);

  // initialize stomp client
  // subscribe
  useEffect(() => {
    function connectWebSocket() {
      const client = new Client({
        // define a factory function that returns a new SockJS instance
        webSocketFactory: () => new SockJS('http://localhost:8080/chat'),
        reconnectDelay: 5000,
      });

      client.onConnect = () => {
        setStompClient(client);

        toast.success('Connected');
        // subscribe to a topic for the current roomId
        client.subscribe(`/topic/room/${roomId}`, (message) => {
          //  console.log(message);
          const newMessage = JSON.parse(message.body);
          // add new message to the list
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        });
      };

      // activate the STOMP client to connect
      client.activate();
    }

    if (connected) {
      connectWebSocket();
    }
  }, [roomId]);

  // handle send message
  async function sendMessage() {
    if (stompClient && connected && input.trim()) {
      // console.log(input);

      const message = {
        sender: currentUser,
        content: input,
        roomId: roomId,
      };

      stompClient.publish({
        destination: `/app/sendMessage/${roomId}`,
        body: JSON.stringify(message),
      });

      setInput('');
    }
  }

  // auto scroll up on new message
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  // handle leave room
  function handleLeaveRoom() {
    if (stompClient) {
      stompClient.deactivate();
    }
    setConnected(false);
    setRoomId('');
    setCurrentUser('');
    navigate('/');
  }

  return (
    <div>
      <Navbar onLeaveRoom={handleLeaveRoom} />

      {/* message container */}
      <main
        ref={chatBoxRef}
        className="py-20 px-8 h-screen overflow-auto dark:bg-slate-600 w-5/6 mx-auto"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === currentUser ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`my-2 ${
                message.sender === currentUser ? 'bg-yellow-300' : 'bg-blue-300'
              } dark:text-black rounded-lg max-w-xs p-3`}
            >
              <div className="flex flex-row gap-2 p-2">
                <img
                  className="w-12 h-12 rounded-full"
                  src="https://avatar.iran.liara.run/public"
                />
                <div className="flex flex-col gap-1 p-2">
                  <p className="font-bold text-sm">{message.sender}</p>
                  <p>{message.content}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* input message container */}
      <div className="bottom-0 fixed w-full mx-auto h-16 mb-2">
        <div className="flex items-center justify-center w-3/4 h-full mx-auto dark:bg-gray-800 rounded-lg">
          <div className="p-1 w-full flex justify-center gap-6 rounded-lg">
            <input
              type="text"
              id="content"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-5/6 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your message..."
              required
            />
            <div className="gap-2 flex">
              <button
                type="button"
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-1 border-transparent hover:border-blue-700"
              >
                <IoAttachSharp size={20} />
              </button>
              <button
                type="button"
                onClick={sendMessage}
                className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-full text-sm w-10 h-10 flex items-center justify-center border border-transparent hover:border-teal-500"
              >
                <IoSend size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
