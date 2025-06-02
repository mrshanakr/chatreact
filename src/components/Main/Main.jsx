import React, { useContext, useState } from "react";
import './Main.css';
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";

const ThemeToggle = ({ theme, toggleTheme }) => (
    <button onClick={toggleTheme} style={{ cursor: "pointer", padding: "5px 10px", border: "none", background: "transparent" }}>
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
);

const Greeting = () => (
    <div className="greet">
        <p>
            <span>Hello, Shankar Khadar</span>
        </p>
        <p>How can I help you today</p>
    </div>
);

const Card = ({ text, icon }) => (
    <div className="card">
        <p>{text}</p>
        <img src={icon} alt="Card Icon" />
    </div>
);

const Result = ({ recentPrompt, loading, resultData }) => (
    <div className="result">
        <div className="result-title">
            <img src={assets.user_icon} alt="User Icon" />
            <p>{recentPrompt}</p>
        </div>
        <div className="result-data">
            <img src={assets.gemini_icon} alt="Gemini" />
            {loading ? (
                <div className="loader">
                    <hr />
                    <hr />
                    <hr />
                </div>
            ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
            )}
        </div>
    </div>
);

const Main = () => {
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input, handleVoiceInput } = useContext(Context);
    const [theme, setTheme] = useState("light");

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    return (
        <div className={`main ${theme}`}>
            <div className="nav">
                <p>LLM</p>
                <div>
                    <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
                    <img src={assets.user_icon} alt="User Icon" />
                </div>
            </div>

            <div className="main-container">
                {!showResult ? (
                    <>
                        <Greeting />
                        <div className="cards">
                            <Card text="Suggest beautiful places to see on an upcoming road trip" icon={assets.compass_icon} />
                            <Card text="Briefly summarize this concept: urban planning" icon={assets.bulb_icon} />
                            <Card text="Brainstorm team bonding activities for our work retreat" icon={assets.message_icon} />
                            <Card text="Improve the readability of the following code" icon={assets.code_icon} />
                        </div>
                    </>
                ) : (
                    <Result recentPrompt={recentPrompt} loading={loading} resultData={resultData} />
                )}

                <div className="main-bottom">
                    <div className="search-box">
                        <input
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            type="text"
                            placeholder="Ask to LLM"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    onSent();
                                }
                            }}
                        />
                        <div>
                            <img src={assets.gallery_icon} alt="Gallery" />
                            <img onClick={() => handleVoiceInput()} src={assets.mic_icon} alt="Mic" />
                            {input ? <img onClick={() => onSent()} src={assets.send_icon} alt="Send" /> : null}
                        </div>
                    </div>
                    <p className="bottom-info">developed by shankar khadar..................</p>
                </div>
            </div>
        </div>
    );
};

export default Main;
