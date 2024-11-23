"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import OLF from "../OneLastFetch";
import ApiLinks from "../apiLinks";
import { navigate } from "../actions/navigate";
import { useUserDataContext } from "../userContextProvider";
import PageTemplate from "../templates/pageTemplate";
import FormErrorWrap from "../templates/formErrorWrap";
import Regex from "../regex";
import FormErrorParahraph from "../templates/formErrorParagraph";

export default function Login() {
  type FormProps = {
    email: string | null;
    password: string | null;
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    setError,
  } = useForm<FormProps>();

  const { email, setEmail, userId, setUserId } = useUserDataContext();

  const onSubmit: SubmitHandler<FormProps> = async (data) => {
    try {
      const response = await OLF.post(ApiLinks.login, data);
      console.log(response);
      setUserId(response["user_id"]);
      setEmail(response["email"]);
      navigate("/time-capsule");
      //tu winno byc ale raziena backendu ni ma      navigate("form");
      console.log("Form submitted successfully", response);
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <PageTemplate>
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
                message: "email is required",
              },
            })}
          />
          <FormErrorParahraph errorObject={errors.email}></FormErrorParahraph>
        </FormErrorWrap>
        <FormErrorWrap>
          <input
            id="password"
            {...register("password", {
              validate: (password) => {
                if (!Regex.password.test(password ?? ""))
                  return "password must be in correct format";
                return true;
              },
              required: {
                value: true,
                message: "password is required",
              },
            })}
          />
          <FormErrorParahraph errorObject={errors.email}></FormErrorParahraph>
        </FormErrorWrap>
        <button type="submit" onClick={() => console.log("click")}>
          Login!
        </button>
      </form>
    </PageTemplate>
  );
}
