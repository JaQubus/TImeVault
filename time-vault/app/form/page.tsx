"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { DefaultForm } from "../types";
import OLF from "../OneLastFetch";
import ApiLinks from "../apiLinks";
import PageTemplate from "../templates/pageTemplate";
import FormErrorWrap from "../templates/formErrorWrap";
import FormErrorParahraph from "../templates/formErrorParagraph";
import { useUserDataContext } from "../userContextProvider";

const Form = () => {
  type FormProps = DefaultForm;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormProps>();

  const onSubmit: SubmitHandler<FormProps> = async (data) => {
    try {
      const response = await OLF.post(ApiLinks.snedForm, data);
      console.log("Form submitted successfully", response);
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  const { customformFields } = useUserDataContext();

  return (
    <PageTemplate>
      <form onSubmit={handleSubmit(onSubmit)}>
        {!customformFields || customformFields.length === 0 ? (
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
              <label htmlFor="due">Due:</label>
              <input
                id="due"
                {...register("due", {
                  validate: (due) => {
                    const dueYear = due;
                    if (isNaN(dueYear)) return "Due must be a valid number";
                    if (dueYear <= 0) return "Due year must be greater than 0";
                    if (!Number.isInteger(dueYear))
                      return "Due year must be an integer";
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
          </FormErrorWrap>
        ) : (
          customformFields.map((field, index) => (
            <FormErrorWrap key={index}>
              <input
                  id={"tite"}
                  {...register("target", {validate: (target) => {if(target?.length >= 100) return"Target must be less than " )}
              />
              <FormErrorParahraph errorObject={errors.target}></FormErrorParahraph>
            </FormErrorWrap>
          ))
        )}
        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </form>
    </PageTemplate>
  );
};

export default Form;
