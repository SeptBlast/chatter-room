import React, { useEffect, useState } from 'react';
import './App.css';
import Chat from './Chat';
import SideBar from './SideBar';
import Pusher from 'pusher-js'
import axios from './axios'
import dotenv from 'dotenv'

dotenv.config()

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('/app/v1/messages/sync').then(respose => {
      // console.log(respose.data);
      setMessages(respose.data);
    });
  }, []);

  useEffect(() => {
    const pusher = new Pusher(process.env.PUSHER_KEY, {
      cluster: 'ap2',
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function(newMessage) {
      // alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage])
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  console.log(messages);

  return (
    <div className="app">
      <div className="app__body">
        { /* SIDEBAR */}
        <SideBar />
        { /* CHAT COMPONENT */}
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
