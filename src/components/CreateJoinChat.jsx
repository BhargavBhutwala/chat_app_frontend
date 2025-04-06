import React from 'react';
import chatIcon from '../assets/chat.png';

const CreateJoinChat = () => {
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
            <div class="mb-5">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your name
              </label>
              <input
                type="text"
                id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter your name"
                required
              />
            </div>
            <div class="mb-5">
              <label
                for="roomId"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Room ID
              </label>
              <input
                type="text"
                id="roomId"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter room ID"
                required
              />
            </div>
            <div className="mt-6 justify-center gap-2 flex">
              <button
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Join Room
              </button>
              <button
                type="button"
                class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
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
