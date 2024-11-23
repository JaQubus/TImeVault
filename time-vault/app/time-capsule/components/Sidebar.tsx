import React from "react";
import styles from "../styles.module.scss";

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
    <div className={styles.logo_container}>
        <img src="logo.png" alt="Logo" />
    </div>

<div className={styles.sidebar_items}>
    <div className={styles.sidebar_item}>
        <img src="icon.png" alt="Icon" />
        <span>Time Capsule</span>
    </div>
    <div className={styles.sidebar_item}>
        <img src="icon.png" alt="Icon" />
        <span>Goals</span>
    </div>
    <div className={styles.sidebar_item}>
        <img src="icon.png" alt="Icon" />
        <span>Questions</span>
    </div>
    <div className={styles.sidebar_item}>
        <img src="icon.png" alt="Icon" />
        <span>Photos</span>
    </div>
</div>
<div className={styles.sidebar_footer}>
    <div className={styles.sidebar_footer_account}>
        <img src="user-icon.png" alt="user-icon"></img>
        <span>Username</span>
    </div>
    <button className={styles.sidebar_button}>Logout</button>
</div>
</aside>
);
}