import React, { ReactNode } from "react";

type FormErrorWrapProps = {
  children: ReactNode;
};

const FormErrorWrap = ({ children }: FormErrorWrapProps) => {
  return (
    <div className="flex flex-col gap-1 text-wrap text-left">{children}</div>
  );
};

export default FormErrorWrap;
