import React, { useEffect, useRef, useState } from "react";

interface InputProps {
    type?: string;
    rows?: number;
    className: string;
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const InputValidator = ({ isTextArea, stringLength = 100000, ...props }: { 
    isTextArea: boolean;
    stringLength?: number;
} & InputProps) => {
  const [inputLength, setInputLength] = useState(props.value.length);
  const textAreaRef = useRef<HTMLTextAreaElement | undefined>();

  // Обновлять высоту textarea в зависимости от содержимого
  useEffect(() => {
    const textArea = textAreaRef.current;
    if(textArea) {
        // textArea.style.height = "auto"; // Сначала сбросить высоту
        textArea.style.height = `${textArea.scrollHeight}px`; // Установить высоту равной высоте содержимого
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputLength(e.target.value.length);
    props.onChange(e);
  };

  return (
    <>
        {isTextArea ? (
            <textarea
                {...props}
                onChange={handleInputChange}
                ref={textAreaRef as React.LegacyRef<HTMLTextAreaElement> | undefined}
            />
        ) : (
            <input 
                {...props}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                    }
                }}
                onChange={handleInputChange}
            />
        )}
        {inputLength > stringLength && (
            <div className="text-danger mt-3">Too long!</div>
        )}
    </>
)}
export default InputValidator
