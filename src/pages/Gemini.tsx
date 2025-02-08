'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import Elementor from '../components/editor/Elementor';
import { cn } from '../libs/utils';
import EditComponent from '../components/editor/EditComponent';
import MainContainer from '../components/editor/MainContainer';
import { GoogleGenerativeAI } from "@google/generative-ai";
import APIKey from './GeminiAPIKey';


async function chat(prompt: string): Promise<string> {
  const genAI = new GoogleGenerativeAI(APIKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const result = await model.generateContent(prompt);
  return result.response.text();
}

type Props = {};

function Gemini({}: Props) {
  const [structure, setStructure] = useState();

  return (
    <div className="container">
      <Head>
        <title>Gemini</title>
      </Head>
      <main>
        <h1 className="title">Gemini Demo</h1>
        {/* Insert Chat Component */}
      </main>
    </div>
  )
}

export default Gemini;
