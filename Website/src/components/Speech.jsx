import React, { useState, useEffect } from 'react';

export default function Speech() {
    const [text, setText] = useState('');
    const [voiceLoaded, setVoiceLoaded] = useState(false);

    const speakText = () => {
        if (!text.trim()) {
            alert('Please enter some text to read.');
            return;
        }

        if (voiceLoaded && window.responsiveVoice) {
            window.responsiveVoice.speak(text, "Hindi Female");
        } else {
            alert('ResponsiveVoice is still loading. Please wait.');
        }
    };

    useEffect(() => {
                if (!document.querySelector('script[src*="responsivevoice.js"]')) {
            const script = document.createElement('script');
            script.src = "https://code.responsivevoice.org/responsivevoice.js?key=8T3HO3vs";
            script.async = true;
            script.onload = () => setVoiceLoaded(true);
            document.body.appendChild(script);
        } else {
            setVoiceLoaded(true);
        }
    }, []);

    return (
        <div>
            <h2>Text-to-Speech Converter</h2>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text here"
            />
            <button onClick={speakText}>
                Read Text
            </button>
        </div>
    );
}