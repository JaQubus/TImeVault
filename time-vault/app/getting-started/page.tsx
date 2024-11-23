"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import PageTemplate from "../templates/pageTemplate";
import OLF from "../OneLastFetch";
import ApiLinks from "../apiLinks";
import FormErrorWrap from "../templates/formErrorWrap";
import Regex from "../regex";
import FormErrorParahraph from "../templates/formErrorParagraph";
import { navigate } from "../actions/navigate";
import { useUserDataContext } from "../userContextProvider";

type FormProps = {
  username: string | null;
  email: string | null;
  password: string | null;
};

export default function gettingStarted() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    setError,
  } = useForm<FormProps>();

  const { setEmail, setUsername, setUserId } = useUserDataContext();

  const onSubmit: SubmitHandler<FormProps> = async (data) => {
    try {
      const response = await OLF.post(ApiLinks.register, {
        username: data.username,
        email: data.email,
        password: data.password,
      });

      setUserId(response["user_id"]);
      setUsername(data.username);
      setEmail(data.email);
      navigate("time-capsule");
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
            id="username"
            {...register("username", {
              validate: (username) => {
                if (!username || username.length <= 4)
                  return "Username must be at least 4 characters";
              },
              required: {
                value: true,
                message: "Username is required to continue",
              },
            })}
            type="text"
            placeholder="Username"
            name="username"
          />
          <FormErrorParahraph errorObject={errors.email}></FormErrorParahraph>
        </FormErrorWrap>
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
        <FormErrorWrap>
          <input
            id="password"
            {...register("password", {
              validate: (password) => {
                if (!password || !Regex.password.test(password))
                  return "Password must be At least 8 char long";
                return true;
              },
              required: {
                value: true,
                message: "Password is required",
              },
            })}
            type="password"
            placeholder="Password"
            name="password"
          />
          <FormErrorParahraph
            errorObject={errors.password}
          ></FormErrorParahraph>
        </FormErrorWrap>
        <button type="submit" disabled={isSubmitting}>
          Register!
        </button>
      </form>
    </PageTemplate>
  );
}
