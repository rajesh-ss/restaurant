import { useRef, useState } from 'react';

import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {

  const [amountIsValid, setAmountIsValid] = useState(true);
  const [amm, changeAmm] = useState("")
  // const [death, changeDeath] = useState(0);
  // const [discharge, changeDischarge] = useState(0);
  const [date, changeDate] = useState("");
      
  console.log(amm)

  const amountInputRef = useRef();

  console.log(props)
  // changeId(props.id);
  // changePrice(props.price);
  // changeName(props.name);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmountNumber);
  };


  const addItemsServer = ()=>{
    try{

      fetch("http://ec2-107-22-23-55.compute-1.amazonaws.com:3306//insert", {
        method: "POST",
        headers: {"Content-Type": "application/JSON"},
        body: JSON.stringify({
          "idone":props.id,
          "name": props.name,
          "nos": amm,
      }
          
          )})
        .then(function(response) {
              console.log(response)
              //return response.json();
            })

      // axios.post('http://ec2-44-211-225-43.compute-1.amazonaws.com:3306/insert', {
      //     firstName: 'Fred',
      //     lastName: 'Flintstone'
      //   })
      //   .then(function (response) {
      //     console.log(response);
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });
  }
  catch(e){
      console.log(e)
  }

  }
  

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      
      <Input
        ref={amountInputRef}
        onChange = {e => changeAmm(e.target.value)}
        label='Amount'
        input={{
          id: 'amount_' + props.id,
          
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button onClick={addItemsServer}>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
