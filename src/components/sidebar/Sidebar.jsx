import React, { useContext, useState } from 'react'
import './Sidebar.css'
import hamburger from '../../assets/hamburger.png'
import clockIcon from '../../assets/clock-icon.png'
import download from '../../assets/download.png'
import message from '../../assets/message.png'
import questionMark from '../../assets/question-mark.png'
import settings from '../../assets/settings.png'
import { Context } from "../../config/context/Context";


const Sidebar = () => {
    const [extended, setExtended] = useState(false)
    const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context)

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt)
        await onSent(prompt)
    }

    return (
        // <div className='sidebar'>
        <div className={`sidebar ${extended ? 'extended' : 'collapsed'}`}>

            <div className="top">
                <img onClick={() => setExtended(prev => !prev)} className='menu' src={hamburger} alt="Not Found" />
                <div onClick={() => newChat()} className="new-chat">
                    <img src={download} alt="Not Found" />
                    {extended ? <p>New Chat</p> : null}
                </div>

                {extended ?
                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        {prevPrompts.map((item, index) => {
                            return (
                                <div onClick={() => loadPrompt(item)} className="recent-entry" key={index}>
                                    <img src={message} alt="Not Found" />
                                    <p>{item.slice(0, 18)}...</p>
                                </div>
                            )
                        })}
                    </div>
                    : null}
            </div>

            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={questionMark} alt="" />
                    {extended ? <p>Help</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={clockIcon} alt="" />
                    {extended ? <p>Activity</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={settings} alt="" />
                    {extended ? <p>Settings</p> : null}
                </div>
            </div>
        </div>
    )
}

export default Sidebar