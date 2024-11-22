"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import PageTemplate from "../templates/pageTemplate";
import OLF from "../OneLastFetch";
import ApiLinks from "../apiLinks";
import FormErrorWrap from "../templates/formErrorWrap";
import Regex from "../regex";
import FormErrorParahraph from "../templates/formErrorParagraph";
import { navigate } from "../actions/navigate";

type FormProps = {
  email: string | null;
};

export default function gettingStarted() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    setError,
  } = useForm<FormProps>();

  const onSubmit: SubmitHandler<FormProps> = async (data) => {
    try {
      navigate("form");
      const response = await OLF.post(ApiLinks.sendEmail, data);
      //tu winno byc ale raziena backendu ni ma      navigate("form");
      console.log("Form submitted successfully", response);
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };
  return (
    <PageTemplate>
      Get Started With Time Vault
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormErrorWrap>
          <input
            id="email"
            {...register("email", {
              validate: (email) => {
                if (!Regex.emailRegistration.test(email ?? ""))
                  return "email must be correct";
                return true;
              },
              required: {
                value: true,
                message: "Email is required to continue",
              },
            })}
            type="email"
            placeholder="Email"
            name="email"
          />
          <FormErrorParahraph errorObject={errors.email}></FormErrorParahraph>
        </FormErrorWrap>
        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </form>
    </PageTemplate>
  );
}
