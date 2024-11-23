"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import PageTemplate from "../templates/pageTemplate";
import OLF from "../OneLastFetch";
import ApiLinks from "../apiLinks";
import FormErrorWrap from "../templates/formErrorWrap";
import Regex from "../regex";
import FormErrorParahraph from "../templates/formErrorParagraph";
import { navigate } from "../actions/navigate";
import styles from "./styles.module.scss";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

type FormProps = {
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
      <div className={styles.main}>
        <Navbar className = {styles.navbar} />

        <div>
          <h1>Back to <span className={styles.yellow_text}>your</span> future.</h1>
          <p className={styles.subheading}>Make a time capsule and surprise yourself.</p>
        </div>

        <div className={styles.carousel}>

        </div>

        <div className="">
          <p className={styles.subheading}>Join today and <span className={styles.yellow_text}>write an amazing story</span> </p>
          <form className={styles.login_form} onSubmit={handleSubmit(onSubmit)}>
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
              Submit
            </button>
          </form>
        </div>
        <div className={styles.bg_gradient}></div>
        
      </div>
      <Footer />
    </PageTemplate>
  );
}
