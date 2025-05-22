"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";
function isInValid(text) {
  console.log("Text:", text);
  return !text || text.trim() === "";
}
export async function handleSubmit(prevState,formData) {
  console.log("Form data:", formData);
  const mealData = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };
  if (
    isInValid(mealData.title) ||
    isInValid(mealData.summary) ||
    isInValid(mealData.instructions) ||
    isInValid(mealData.creator) ||
    isInValid(mealData.creator_email)||
    !mealData.image || mealData.image.size === 0 ||
    !mealData.creator_email.includes("@")
  ) {
    return {message: "Invalid input"};
  }
  await saveMeal(mealData);
  revalidatePath("/meals");
  redirect("/meals");
}
