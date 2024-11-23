"use server";
import { redirect } from "next/navigation";

export async function navigate(location: string) {
  redirect("/" + location);
}
