import React from 'react';
import { useNavigate } from 'react-router';
import { useChatContext } from '../context/ChatContext';

const Navbar = ({ onLeaveRoom }) => {
  const { roomId, currentUser, connected, setConnected } = useChatContext();

  const navigate = useNavigate();

  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-950 w-full fixed h-20">
        <div className="flex items-center justify-between mx-auto p-4">
          <div className="pl-3">
            <h1 className="text-2xl font-semibold">
              Room: <span>{roomId}</span>
            </h1>
          </div>
          <div>
            <h1 className="text-2xl font-semibold">
              User: <span>{currentUser}</span>
            </h1>
          </div>
          <div className="pr-3">
            <button
              type="button"
              onClick={onLeaveRoom}
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-1 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Leave Room
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
