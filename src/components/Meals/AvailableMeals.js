import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import sushi from '../../assets/sushi.jpeg';
import { useState, useEffect } from 'react';



const DUMMY_MEALS = [
  {
    id: 'm1',
    name: 'Sushi',
    description: 'Finest fish and veggies',
    price: 22.99,
  },
  {
    id: 'm2',
    name: 'Schnitzel',
    description: 'A german specialty!',
    price: 16.5,
  },
  {
    id: 'm3',
    name: 'Barbecue Burger',
    description: 'American, raw, meaty',
    price: 12.99,
  },
  {
    id: 'm4',
    name: 'Green Bowl',
    description: 'Healthy...and green...',
    price: 18.99,
  },
];

const AvailableMeals = () => {

const [message, setMessage] = useState([]);

useEffect(() => {
  //http://ec2-54-205-32-49.compute-1.amazonaws.com:3306/data http://ec2-54-237-248-252.compute-1.amazonaws.com:3306/data
  fetch("http://ec2-107-22-23-55.compute-1.amazonaws.com:3306/data")
    .then((res) => res.json())
    .then((data) => setMessage(data.message));

}, []);


  const mealsList = message.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
      img = {meal.image}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
