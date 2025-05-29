import React, { createContext, useState } from 'react';
import { onSent as generateAIResponse } from "../gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState('');
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    const [isPaused, setIsPaused] = useState(false);
    const [typingIndex, setTypingIndex] = useState(0);
    const [typingArray, setTypingArray] = useState([]);

    const delayPara = (index) => {
        if (index >= typingArray.length || isPaused) return;

        setTimeout(() => {
            setResultData(prev => prev + typingArray[index]);
            setTypingIndex(index + 1);
            delayPara(index + 1);
        }, 30);
    };

    const runChat = async (prompt) => {
        try {
            const response = await generateAIResponse(prompt);
            return response;
        } catch (error) {
            console.error('Error fetching AI response:', error);
            return "Sorry, I couldn't process your request.";
        }
    };

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);

        let response;
        if (prompt !== undefined) {
            response = await runChat(prompt);
        } else {
            setRecentPrompt(input);
            response = await runChat(input);
            setPrevPrompts(prev => [...prev, input]);
        }

        let responseArray = response.split("**");
        let newResponse = "";

        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i];
            } else {
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
        }

        let newResponse2 = newResponse.split("*").join("<br>");
        let newResponseArray = newResponse2.split("");

        setTypingArray(newResponseArray);
        setTypingIndex(0);
        setIsPaused(false);
        delayPara(0);

        setLoading(false);
        setInput("");

        return response;
    };

    const togglePause = () => {
        setIsPaused(prev => !prev);
        if (isPaused) {
            delayPara(typingIndex);
        }
    };

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
        setInput("");
        setResultData("");
    };

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
        isPaused,
        togglePause
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
