import styles from "./navbar.module.scss";
import Logo from "../svg/Logo";
import { HTMLProps } from "react";

type NavBarProps = HTMLProps<HTMLElement>;

export default function Navbar(props: NavBarProps) {
  return (
    <nav className={styles.nav_bar}>
        <div className={styles.align_container}>
            <Logo className={styles.logo} />
            <div className={styles.logo_text}>TimeVault</div>
        </div>
    </nav>
  )
}