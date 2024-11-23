"use client";

import { ReactNode } from "react";
import styles from "./styles.module.scss";

type PageTemplateProps = {
  children: ReactNode;
};

const PageTemplate = ({ children }: PageTemplateProps) => {
  return (
    <div className={styles.main}> 
      <main className={styles.page}>{children}</main>
    </div>
  );
};

export default PageTemplate;
