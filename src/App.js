import React, { useState, useEffect } from "react";
import { Route, Link, Switch } from 'react-router-dom';

import PizzaForm from './components/PizzaForm';

import schema from './validations/formSchema';
import axios from 'axios';
import * as yup from 'yup';

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

  const [order, setOrder] = useState(initialOrder)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)

  const getOrders = () => {
    axios.get('https://reqres.in/')
      .then(res => {
        setOrder(res.data);
      }).catch(err => console.error(err))
  }

  const postNewOrder = newOrder => {
    axios.post('https://reqres.in/', newOrder)
      .then(res => {
        setOrder([res.data, ...order])
        setFormValues(initialFormValues);
      }).catch(err => {
        console.error(err);
        setFormValues(initialFormValues)
      })
  }
    const validate = (name, value) => {
      yup.reach(schema, name)
        .validate(value)
        .then(() => setFormErrors({ ...formErrors, [name]: ''}))
        .catch(err => setFormErrors({ ...formErrors, [name]:err.errors[0] }))
    }

    const inputChange = (name, value) => {
      validate(name, value);
      setFormValues({
        ...formValues, 
        [name]: value
      })
    }

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
        method: formValues.method.trim()
      }
      postNewOrder(newOrder);
    }

    useEffect(() => {
      getOrders()
    }, [])

    useEffect(() => {
      schema.isValid(formValues).then(valid => setDisabled(!valid))
    }, [formValues])

  return (
    <div className='App'>
      <nav>
        <h1 className='store-header'>Lambda Eats</h1>
        <div className='nav-links'>
          <Link to="/">Home</Link>
          <Link to="/pizza">Order Now</Link>
        </div>
      </nav>

      <Switch>
        <Route path="/pizza">
          <PizzaForm id="pizza-form"/>
        </Route>
        <Route path="/"> Home 
        </Route>
      </Switch>


      <div className='home-wrapper'>
            <img 
                className='home-image'
                src='Assets/Pizza.jpg'
                alt='pizza'
            />
            <button
                Link to="/pizza"
                className='md-button order-button'
            >Order Now
            </button>
        </div>
    </div>
  );
}

