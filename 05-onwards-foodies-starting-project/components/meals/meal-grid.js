import React from 'react';
import classes from './meal-grid.module.css';
import MealItem from './meal-item';

export default function MealsGrid({meals}) {
  console.log("meals..",meals);
  return (
    <ul className={classes.meals}>
      
        {meals.flat().map((item) => (
            <li key={item.id}>
                <MealItem {...item}/>
            </li>
        ))}
    </ul>
  )
  
}
