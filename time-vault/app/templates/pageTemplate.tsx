"use client";

import { ReactNode } from "react";

type PageTemplateProps = {
  children: ReactNode;
};

const PageTemplate = ({ children }: PageTemplateProps) => {
  return (
    <>
      <main className="text-teal-900">{children}</main>
    </>
  );
};

export default PageTemplate;
