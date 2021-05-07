import React, { useEffect, useState } from 'react';

import Card from '../UI/Card';

import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';

const AvailableMeals = () =>{

  const [meals,setMeals] = useState([]);
  const [isError,setIsError] = useState();
  const [isLoding,setIsLoading] = useState(true);

  useEffect(()=>{

    const viewList = async() =>{

        const response = await fetch('https://reactproject-3753e-default-rtdb.firebaseio.com/meals.json')
  
        if(!response.ok)
        {
          throw new Error('Something went wrong');
        }
        const data = await response.json();

        let loadingItem = [];

        for(let key in data)
        {
          loadingItem.push({
            id:key,
            name: data[key].name,
            description: data[key].description,
            price:data[key].price
          })
        }

        //console.log(data);
        setMeals(loadingItem);
        setIsLoading(false);
    };
    
      viewList().catch ((error) => {
      setIsError(error.message);
      console.log(error.message);
      setIsLoading(false);
    });
  },[])

  if(isLoding)
  {
    return (
      <section className={classes.mealLoading}>
      <p>Loading...</p>
      </section>
    )
  }

  if(isError)
  {
    return(
      <section className={classes.mealError}>
        <p>{isError}</p>
      </section>
    )
  }
  
    const mealList = meals.map((meal) =>{
        return(
            <>
            <MealItem id={meal.id} key={meal.id} name={meal.name} description={meal.description} price={meal.price} />
            </>
        )
    })

    return(
        <section className={classes.meals}>
            <Card>
                <ul>{mealList}</ul>
            </Card>
        </section>
    )
}

export default AvailableMeals;