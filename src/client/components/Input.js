import React, { useState, useRef, useEffect } from 'react';

export default function Input(props) {
    const [input, setInput] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        props.OnSubmitInput(input);
        setInput("");
    }

    const handleInput = e => {
        setInput(e.target.value);
    }

    return(
        <form onSubmit={handleSubmit}>
            <input type="text" 
                value={input} 
                placeholder={props.placeholder}
                onChange={handleInput}
                className="w-full border-gray-300 p-2 rounded text-xs"
            />
        </form>
    );
}