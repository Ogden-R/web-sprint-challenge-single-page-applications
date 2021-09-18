import React, { useState, useEffect } from "react";
import { Route, Switch } from 'react-router-dom';
import Home from "./components/Header";
import Pic from "./components/Pic";
import Pizza from './components/Pizza';
import PizzaForm from './components/PizzaForm';
import Success from "./components/Success";

import styled from 'styled-components';
import schema from './validations/formSchema';
import axios from 'axios';
import * as yup from 'yup';


const Container = styled.div`
  * {
    padding: 0px;
    margin: 0px;
    font-family: san-serif;
    text-align: center;
    color: dodgerblue;
  }
`;


const initialFormValues = {
  name: '',
  email: '',

  size: '',
  sauce: '',
  cheese: '',
  crust: '',

  pepperoni: false,
  chicken: false,
  sausage: false,
  bacon: false,
  ham: false,

  spinach: false,
  tomatoes: false,
  onions: false,
  peppers: false,
  pineapple: false,
  mushrooms: false,
  olives: false,

  method: '',
}

const initialFormErrors = {
  name: '',
  email: '',

  size: '',
  sauce: '',
  cheese: '',
  crust: '',
  method: '',
}

const initialOrder = []
const initialDisabled = true

export default function App(props) {
  const [ url ] = useState('https://buff.ly/2UybmBQ');
  const [order, setOrder] = useState(initialOrder)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)




  const postNewOrder = newOrder => {
    axios
      .post('https://reqres.in/api/orders', newOrder)
      .then((res) => {
        setOrder([...order, res.data,])
        setFormValues(initialFormValues);
        console.log('Here is postNewOrder', postNewOrder)
      }).catch(err => {
        debugger;
        console.error(err);
        setFormValues(initialFormValues)
      })
  }

  const validate = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then((valid) => {
        setFormErrors(
          {...formErrors,[name]: '',}
        );
      })
      .catch((err) => {
        setFormErrors(
          { ...formErrors,[name]: err.errors[0]}
        );
      });
  };

    const inputChange = (name, value) => {
      validate(name, value);
      setFormValues({ ...formValues, [name]: value });
    };

    const formSubmit = () => {
      const newOrder = {
        name: formValues.name.trim(),
        email: formValues.name.trim(),
        size: formValues.size.trim(),
        sauce: formValues.sauce.trim(),
        cheese: formValues.cheese.trim(),
        crust: formValues.crust.trim(),
        meats:['pepperoni', 'chicken', 'sausage', 'bacon', 'ham'].filter(meat => !!formValues[meat]),
        veggies:['spinach', 'tomatoes', 'onions', 'peppers', 'pineapple', 'mushrooms', 'olives'].filter(veggie => !!formValues[veggie]),
        method: formValues.method.trim(),
        special: formValues.special.trim()
      }
      postNewOrder(newOrder);
    }

    // useEffect(() => {
    //   getOrders()
    // }, [])

    useEffect(() => {
      schema.isValid(formValues).then((valid) => {
        setDisabled(!valid)
       });
    }, [formValues])

  return (
    <Container>
      <Home
        id="order-pizza"
      />
      <Switch>
        <Route path="/pizza/success">
          <Success
            change={inputChange}
            values={formValues}
            submit={formSubmit}
            orders={order}
          />
        </Route>
        {/* may need exact  */}
        <Route path="/pizza">
          <PizzaForm
            values={formValues}
            change={inputChange}
            submit={formSubmit}
            disabled={disabled}
            errors={formErrors}
          />
        </Route>

        <Route path="/">
          <Pic pic={url} />
        </Route>
      </Switch>
      {order.map((user) => {
        return <Pizza key={user.id} details={user} />;
      })}
    </Container>
  );
}

