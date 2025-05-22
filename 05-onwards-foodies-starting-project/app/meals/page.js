import React, { Suspense } from "react";
import classes from "./page.module.css";
import Link from "next/link";
import MealsGrid from "@/components/meals/meal-grid";
import { getMeals } from "@/lib/meals";
export function GetMealsData() {
  const meals = getMeals();
  return <MealsGrid meals={[meals]} />
}
export default function Page() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious Meals, created {""}{" "}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          choose your favorite recipe and cook it yourself. It is easy and fun
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share your favorite recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense fallback={<p className={classes.loading}>Loading...</p>}> 
          <GetMealsData/>
        </Suspense>
      </main>
    </>
  );
}
