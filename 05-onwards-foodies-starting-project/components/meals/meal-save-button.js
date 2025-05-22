"use client";

import { useFormStatus } from "react-dom";

export default function MealSaveButton() {
  const { pending } = useFormStatus();
  console.log(pending);
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Share Meal"}
    </button>
  );
}
