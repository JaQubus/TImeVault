import React from "react";
import { FieldError } from "react-hook-form";

type FormErrorPropsParagraph = {
  errorObject: FieldError | undefined;
};

const FormErrorParahraph = ({ errorObject }: FormErrorPropsParagraph) => {
  return (
    <>{errorObject && <p className="text-rose-800">{errorObject.message}</p>}</>
  );
};

export default FormErrorParahraph;
