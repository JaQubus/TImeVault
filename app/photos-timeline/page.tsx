import React from "react";
import styles from "../time-capsule/styles.module.scss";
import Sidebar from "../time-capsule/components/Sidebar";

export default function TimeCapsulePage() {
  return (
    <div className={styles.container}>
        <Sidebar />
        <main className={styles.main}>
            <div className={styles.main_header}>
                <h1>Enter a photos to generate a timeline.</h1>
            </div>
        </main>
    </div>
  );
}