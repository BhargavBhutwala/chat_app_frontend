# Chat App Frontend

A modern and responsive chat application frontend built with React, Tailwind CSS, and several utility libraries. The frontend connects to a backend API for creating/joining rooms and exchanging real‑time messages via WebSockets (using STOMP over SockJS).

## Features

- **Create/Join Chat Rooms:**  
  Users can create or join chat rooms by providing a username and room ID.
- **Real-Time Messaging:**  
  Communicate instantly via real-time messaging powered by WebSockets and STOMP.
- **Responsive & Modern UI:**  
  Tailwind CSS ensures a fully responsive, mobile-friendly design with dark mode support.
- **Notifications:**  
  Real-time notifications using [react-hot-toast](https://react-hot-toast.com/) for user feedback.
- **Keyboard Shortcuts:**  
  Send messages by pressing the Enter key.
- **Auto-Scrolling Chat Window:**  
  The chat window auto-scrolls as new messages appear.

## Technology Stack

- **React:** For building the user interface.
- **React Router:** For client-side navigation.
- **Tailwind CSS:** For styling and responsive design.
- **SockJS & @stomp/stompjs:** For establishing WebSocket connections using the STOMP protocol.
- **Axios:** For making HTTP requests to the backend API.
- **react-hot-toast:** For elegant notifications.
- **React Context API:** For state management across the application.
- **React Icons:** For adding icons, e.g., send and attach icons.

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) (version 14 or above)
- [npm](https://www.npmjs.com/) (comes with Node) or [Yarn](https://yarnpkg.com/)
