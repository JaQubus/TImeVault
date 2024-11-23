"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "../styles.module.scss";

export default function Paragraph() {
    const [showDropdown, setShowDropdown] = useState(false);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [paragraphType, setParagraphType] = useState<string | null>(null);
    const [showTextarea, setShowTextarea] = useState(false);
    const [goals, setGoals] = useState<{ id: number; goal: string; progress: number }[]>([]);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

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

    const addGoal = () => {
        setGoals([...goals, { id: goals.length + 1, goal: "", progress: 0 }]);
    };

    const handleGoalChange = (id: number, field: string, value: string | number) => {
        setGoals(goals.map(goal => goal.id === id ? { ...goal, [field]: value } : goal));
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.main_add_paragraph}>
            {paragraphType === "Text" && (
                <div className={styles.paragraph}>
                    <textarea className={styles.textarea} placeholder="Write your message here..."></textarea>
                    <button onClick={handleRemoveTextarea} className={styles.remove_button}>Remove</button>
                </div>
            )}
            {paragraphType === "Question" && (
                <div className={styles.paragraph}>
                    <input type="text" className={styles.input} placeholder="Enter your question here..." />
                    <input type="text" className={styles.input} placeholder="Enter your answer here..." />
                    <button onClick={handleRemoveTextarea} className={styles.remove_button}>Remove</button>
                </div>
            )}
            {paragraphType === "Goals" && (
                <div className={styles.paragraph}>
                    {goals.map(goal => (
                        <div key={goal.id} className={styles.goal}>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="Enter your goal here..."
                                value={goal.goal}
                                onChange={(e) => handleGoalChange(goal.id, "goal", e.target.value)}
                            />
                            <input
                                type="range"
                                className={styles.slider}
                                value={goal.progress}
                                onChange={(e) => handleGoalChange(goal.id, "progress", Number(e.target.value))}
                            />
                        </div>
                    ))}
                    <button onClick={addGoal} className={styles.add_goal_button}>Add Goal</button>
                    <button onClick={handleRemoveTextarea} className={styles.remove_button}>Remove</button>
                </div>
            )}
            {paragraphType === "Image" && (
                <div className={styles.paragraph}>
                    <input type="file" className={styles.input} accept="image/*" />
                    <button onClick={handleRemoveTextarea} className={styles.remove_button}>Remove</button>
                </div>
            )}
            {!paragraphType && (
                <>
                    <button ref={buttonRef} onClick={handleButtonClick}>Add paragraph</button>
                    {showDropdown && (
                        <div
                            ref={dropdownRef}
                            className={styles.dropdown_menu}
                            style={{ top: cursorPosition.y, left: cursorPosition.x }}
                        >
                            <ul>
                                <li onClick={() => handleMenuItemClick("Text")}>Text</li>
                                <li onClick={() => handleMenuItemClick("Question")}>Question</li>
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