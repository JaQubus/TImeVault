import React from "react";
import styles from "../styles.module.scss";
import Paragraph from "./Paragraph";
import MainForm from "./MainForm";
export default function MainContent() {
    return (
        <div className={styles.main_content}>
            <p>Dear username...</p>
            <Paragraph />
            <Paragraph />
            <Paragraph />
            <Paragraph />
            <MainForm />
    </div>
    )
} 