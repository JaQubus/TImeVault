import React, { SetStateAction } from "react";
import styles from "../styles.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import FormErrorWrap from "@/app/templates/formErrorWrap";
import FormErrorParahraph from "@/app/templates/formErrorParagraph";

type MainFormProps = {
  setDate: React.Dispatch<SetStateAction<Date | null>>;
  //  setMessage: React.Dispatch<SetStateAction<string[] | null>>;
  setSubmit: React.Dispatch<SetStateAction<boolean>>;
};

export default function MainForm({ setDate, setSubmit }: MainFormProps) {
  type FormProps = {
    date: Date;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>();

  const onSubmit: SubmitHandler<FormProps> = async (data) => {
    setDate(new Date(data.date));
    setSubmit(true);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.main_form}>
      <FormErrorWrap>
        <label htmlFor="date">When to send a time capsule?</label>
        <input
          type="date"
          className={styles.main_input}
          id="date"
          {...register("date", {
            required: {
              value: true,
              message: "Date to send capsule is required",
            },
          })}
        />
        <FormErrorParahraph errorObject={errors.date}></FormErrorParahraph>
      </FormErrorWrap>
      <input
        type="submit"
        value="Send a time capsule!"
        className={styles.main_form_button}
      />
    </form>
  );
}

