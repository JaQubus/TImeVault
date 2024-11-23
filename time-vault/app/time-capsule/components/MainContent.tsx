"use client";

import React, { useState } from "react";
import styles from "../styles.module.scss";
import Paragraph from "./Paragraph";
import MainForm from "./MainForm";

export default function MainContent() {
    const [paragraphs, setParagraphs] = useState<number[]>([1]);

    const addParagraph = () => {
        setParagraphs([...paragraphs, paragraphs.length + 1]);
    };

    const removeParagraph = (id: number) => {
        setParagraphs(paragraphs.filter(paragraphId => paragraphId !== id));
    };

    return (
        <div className={styles.main_content}>
            <p>Dear username...</p>
            {paragraphs.map((id) => (
                <Paragraph key={id} id={id} removeParagraph={removeParagraph} />
            ))}
            <button onClick={addParagraph} className={styles.add_paragraph_button}>+</button>
            <MainForm />
        </div>
    );
}