import React, { useContext } from 'react';
import { Context } from "../../../config/context/Context";

import "./main.css";
import compass from '../../../assets/compass.png';
import bulb from '../../../assets/bulb.png';
import message from '../../../assets/message.png';
import code from '../../../assets/code.png';
import gallery from '../../../assets/gallery.png';
import mike from '../../../assets/mike.png';
import sendIcon from '../../../assets/send_icon.png';
import gemini from '../../../assets/gemini.png';
import stopIcon from '../../../assets/stop.svg';

const Main = () => {
    const {
        onSent,
        recentPrompt,
        showResult,
        loading,
        resultData,
        setInput,
        input,
        togglePause
    } = useContext(Context);

    return (
        <div className='main'>
            <div className="nav">
                <p>Gemini</p>
                <img src="https://clone-gemini.vercel.app/assets/user_icon-BYrw3k3X.png" alt="User Icon" />
            </div>

            <div className="main-container">
                {!showResult ? (
                    <>
                        <div className="greet">
                            <p><span>Hello,</span></p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className="cards">
                            <div className="card" onClick={() => setInput("Suggest beautiful places to visit")}>
                                <p>Suggest beautiful places to visit</p>
                                <img src={compass} alt="Compass" />
                            </div>
                            <div className="card" onClick={() => setInput("Give me creative startup ideas")}>
                                <p>Give me creative startup ideas</p>
                                <img src={bulb} alt="Bulb" />
                            </div>
                            <div className="card" onClick={() => setInput("Write a message to my crush 😅")}>
                                <p>Write a message to my crush 😅</p>
                                <img src={message} alt="Message" />
                            </div>
                            <div className="card" onClick={() => setInput("Generate a cool React component")}>
                                <p>Generate a cool React component</p>
                                <img src={code} alt="Code" />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className='result'>
                        <div className="result-title">
                            <img src="https://clone-gemini.vercel.app/assets/user_icon-BYrw3k3X.png" alt="User Icon" />
                            <p>{recentPrompt}</p>
                        </div>

                        <div className='result-data'>
                            <img src={gemini} alt="Gemini Logo" />
                            {loading ? (
                                <div className='loader'>
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                            ) : (
                                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                            )}
                        </div>
                    </div>
                )}

                <div className="main-bottom">
                    <div className="search-box">
                        <input
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    onSent();
                                }
                            }}
                            value={input}
                            type="text"
                            placeholder='Enter prompt here...'
                        />

                        <div>
                            <img src={gallery} alt="Gallery" />
                            <img src={mike} alt="Microphone" />
                            {!loading ? (
                                <img onClick={() => onSent()} src={sendIcon} alt="Send" />
                            ) : (
                                <img onClick={togglePause} src={stopIcon} alt="Pause/Resume" />
                            )}
                        </div>
                    </div>

                    <p className="bottom-info">
                        Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Main;
