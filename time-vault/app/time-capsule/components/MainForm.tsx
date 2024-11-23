import React from "react";
import styles from "../styles.module.scss";

export default function MainForm() {
    return (
    <form action="" method="" className={styles.main_form}>
        <div className="main-input-box">
            <label htmlFor="date">When to send a time capsule?</label>
            <input type="date" className={styles.main_input} id="date"/>
        </div>
        <input type="submit" value="Send a time capsule!" className={styles.main_form_button}/>
    </form>

    )
}