"use client";

import React, { useState, useEffect, useRef, SetStateAction } from "react";
import styles from "../styles.module.scss";

type ParagraphProps = {
  setMessage: React.Dispatch<SetStateAction<string[] | null>>;
  submit: boolean;
  setSubmit: React.Dispatch<SetStateAction<boolean>>;
};

export default function Paragraph({
  setMessage,
  submit = false,
  setSubmit,
}: ParagraphProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [paragraphType, setParagraphType] = useState<string | null>(null);
  const [showTextarea, setShowTextarea] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [textAreaValue, setTextAreaValue] = useState<string | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleButtonClick = (event: React.MouseEvent) => {
    setCursorPosition({ x: event.clientX, y: event.clientY });
    setShowDropdown(!showDropdown);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setShowDropdown(false);
    }
  };

  const handleMenuItemClick = (type: string) => {
    setParagraphType(type);
    setShowDropdown(false);
    if (type === "Text") {
      setShowTextarea(true);
    }
  };

  const handleRemoveTextarea = () => {
    setShowTextarea(false);
    setParagraphType(null);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (submit) {
    if (textAreaRef.current) {
      const taval = textAreaRef.current.value;
      console.log(taval);
      setMessage((p) => [...(p || []), taval]);
    }
    setSubmit(false);
  }

  return (
    <div className={styles.main_add_paragraph}>
      {showTextarea ? (
        <div>
          <textarea
            className={styles.textarea}
            placeholder="Write your message here..."
            ref={textAreaRef}
          ></textarea>
          <button
            onClick={handleRemoveTextarea}
            className={styles.remove_button}
          >
            Remove
          </button>
        </div>
      ) : (
        <>
          <button ref={buttonRef} onClick={handleButtonClick}>
            Add paragraph
          </button>
          {showDropdown && (
            <div
              ref={dropdownRef}
              className={styles.dropdown_menu}
              style={{ top: cursorPosition.y, left: cursorPosition.x }}
            >
              <ul>
                <li onClick={() => handleMenuItemClick("Text")}>Text</li>
                <li onClick={() => handleMenuItemClick("Question")}>
                  Question
                </li>
                <li onClick={() => handleMenuItemClick("Goals")}>Goals</li>
                <li onClick={() => handleMenuItemClick("Image")}>Image</li>
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}

