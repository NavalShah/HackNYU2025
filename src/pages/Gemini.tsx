'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import Elementor from '../components/editor/Elementor';
import { cn } from '../libs/utils';
import EditComponent from '../components/editor/EditComponent';
import MainContainer from '../components/editor/MainContainer';
import { ChatSession, GoogleGenerativeAI } from "@google/generative-ai";
import APIKey from './GeminiAPIKey';

const model = new GoogleGenerativeAI(APIKey).getGenerativeModel({ model: "gemini-1.5-flash" });

function startChat(instructions: string) {
  return model.startChat();
}

type Props = {
  initialPrompt: string
};

enum messageSender {
  system,
  user,
  ai,
  error
}

type message = {
  sender: messageSender,
  text: string
}


function Gemini({ initialPrompt }: Props) {
  let initialState: message[] = [{
    sender: messageSender.system,
    text: initialPrompt
  }];

  const [messages, setMessages] = useState(initialState);
  const [input, setInput] = useState("");

  let chat = startChat(initialPrompt);

  const sendMessage = async () => {
    if (input.trim() !== "") {

      let userMessage = "" + input;
      setInput("");

      setMessages(prev => [...prev, { text: userMessage, sender: messageSender.user }]);

      let result = await chat.sendMessage(userMessage);
      try {
        setMessages(prev => [...prev, { text: "" + result.response.text(), sender: messageSender.ai }]);

      } catch (e) {
        throw e;
      }


    }
  };


  return (
    <div className="flex flex-col h-screen max-w-md mx-auto p-4 bg-gray-100">
      <div className="flex-1 overflow-auto bg-white p-4 rounded-lg shadow">
        {initialPrompt}
      </div>
      <div className="flex-1 overflow-auto bg-white p-4 rounded-lg shadow">
        {messages.map((msg, index) => (
          (msg.sender != messageSender.system && <div
            key={index}
            className={`p-2 my-2 max-w-xs rounded-lg text-white ${
              msg.sender == messageSender.user ? "bg-blue-500 self-end" : msg.sender == messageSender.error ? "bg-red-500" : "bg-gray-500"
            }`}
          >
            {msg.text}
          </div>)
        ))}
      </div>
      <div className="flex mt-4">
        <input
          type="text"
          className="flex-1 p-2 border rounded-lg"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="ml-2 p-2 bg-blue-500 text-white rounded-lg"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );

}

export default Gemini;
