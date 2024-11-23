import React from "react";
import styles from "./styles.module.scss";
import MainContent from "./components/MainContent";
import Sidebar from "./components/Sidebar";

export default function TimeCapsulePage() {
  return (
    <div className={styles.container}>
        <Sidebar />
        <main className={styles.main}>
            <div className={styles.main_header}>
                <h1>Write a message to your future self.</h1>
            </div>
            <MainContent />
        </main>
    </div>
  );
}