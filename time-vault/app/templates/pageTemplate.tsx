"use client";

import { ReactNode } from "react";

type PageTemplateProps = {
  children: ReactNode;
};

const PageTemplate = ({ children }: PageTemplateProps) => {
  return (
    <>
      <main>{children}</main>
    </>
  );
};

export default PageTemplate;
