"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { DefaultForm } from "../types";
import OLF from "../OneLastFetch";
import ApiLinks from "../apiLinks";
import PageTemplate from "../templates/pageTemplate";
import FormErrorWrap from "../templates/formErrorWrap";
import FormErrorParahraph from "../templates/formErrorParagraph";

const Form = () => {
  type FormProps = DefaultForm;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    setError,
  } = useForm<FormProps>();

  const onSubmit: SubmitHandler<FormProps> = async (data) => {
    try {
      const response = await OLF.post(ApiLinks.snedForm, data);
      console.log("Form submitted successfully", response);
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <PageTemplate>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormErrorWrap>
          <div>
            <label htmlFor="target">Target:</label>
            <input
              id="target"
              {...register("target", {
                validate: (target) =>
                  target && target.length <= 100
                    ? true
                    : "Target must be below 100 chars",
                required: {
                  value: true,
                  message: "Target is required",
                },
              })}
              type="text"
              placeholder="Your Target"
              name="target"
            />
            <FormErrorParahraph
              errorObject={errors.target}
            ></FormErrorParahraph>
          </div>
          <div>
            <label htmlFor="target">Due:</label>
            <input
              id="due"
              {...register("due", {
                validate: (due) => {
                  if (due <= 0) return "Due year must be at least 1";
                  if (due % 1 !== 0) return "Due year must be an integer";
                  return true;
                },
                required: {
                  value: true,
                  message: "Due year is required",
                },
              })}
              type="text"
              placeholder="Due Year"
              name="due"
            />
            <FormErrorParahraph errorObject={errors.due}></FormErrorParahraph>
          </div>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </FormErrorWrap>
      </form>
    </PageTemplate>
  );
};

export default Form;
