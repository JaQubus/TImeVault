"use client";

import React, { useState } from "react";
import styles from "../styles.module.scss";
import Paragraph from "./Paragraph";
import MainForm from "./MainForm";

import { useUserDataContext } from "@/app/userContextProvider";
import OLF from "@/app/OneLastFetch";
import ApiLinks from "@/app/apiLinks";
export default function MainContent() {
  const [date, setDate] = useState<Date | null>(null);
  const [message, setMessage] = useState<string[] | null>(null);
  const [submit, setSubmit] = useState<boolean>(false);
  const { username, userId, email } = useUserDataContext();
  const [finalImages, setFinalImages] = useState<string[]>([]);
  const [finalGoals, setFinalGoals] = useState<
    { id: number; goal: string; progress: number }[]
  >([]);

  const paragraphs = Array.from({ length: 4 }, (_, index) => (
    <Paragraph
      key={index}
      id={index}
      setMessage={setMessage}
      submit={submit}
      setSubmit={setSubmit}
      setFinalGoals={setFinalGoals}
      setFinalImages={setFinalImages}
    />
  ));

  const send = async () => {
    const response = await OLF.post(ApiLinks.sendCapsule, {
      user_id: userId,
      email_sender: "",
      reciever: email,
      date_to_send: date,
      message: message,
      images: "",
      content: "",
    });
    console.log(response);
  };

  if (submit && date && message) {
    send();
  }

  return (
    <div className={styles.main_content}>
      <p>Dear {username}...</p>
      {paragraphs}
      <MainForm setDate={setDate} setSubmit={setSubmit} />
    </div>
  );
}
