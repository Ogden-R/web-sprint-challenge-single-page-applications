import React from 'react';
import { useHistory } from "react-router-dom";
import '../App.css';

  
export default function PizzaForm(props) {
    const { submit, values, change, disabled, errors } = props   

    const history = useHistory();

    const successRoute = () => {
        history.push("/pizza/success");
    }
    const onChange = (evt) => {
        const { name, value, checked, type } = evt.target
        const valueToUse = type === 'checkbox' ? checked : value;
        change(name, valueToUse)
    }

    const onSubmit = (evt) => {
        history.push('/pizza/success');
        evt.preventDefault();
        submit();
    }

    return (
        <form className="form container" id="pizza-form" onChange={onChange} onSubmit={onSubmit}>
            <div className="form-group submit">
                <h2>Add a Pizza</h2>
            </div>
            <div className='errors'>
                <div>{errors.name}</div>
                <div>{errors.email}</div>
                <div>{errors.size}</div>
                <div>{errors.sauce}</div>
                <div>{errors.cheese}</div>
                <div>{errors.crust}</div>
                <div>{errors.special}</div>
            </div>
        <div className="personal-info">
            <h2>General Information</h2>
            <div className='form-group inputs'>
                <label>Name:
                    <input value={values.name} onChange={onChange} name='name'
                    id='name-input'  
                    type='text' />
                </label>
                <label>Email:
                    <input value={values.email} onChange={onChange} name='email' type='text' />
                </label>
            </div>
        </div>
        <div className="order-info">
            <div className='form-group inputs'>
                <h2>Let's Build A Pizza! </h2>
                <label>Size:
                    <select
                        onChange={onChange}  value={values.size} name='size' id='size-dropdown'
                    >
                        <option value=''>- Select a Size -</option>
                        <option value='small'>Small - 10 inch</option>
                        <option value='med'>Medium - 12 inch</option>
                        <option value='lg'>Large - 14 inch</option>
                        <option value='xl'>Extra Large - 16 inch</option>
                    </select>
                </label>
                    <br/>
                <label>Sauce:
                <select
                    onChange={onChange} value={values.sauce} name='sauce' id='sauce-dropdown'
                >
                    <option value='marinara'>- Marinara Sauce is the Default-</option>
                    <option value='none'>No Sauce</option>
                    <option value='bbq'>BBQ Sauce</option>
                    <option value='alfredo-parm'>Alfredo Parmesan</option>
                    <option value='ranch'>Ranch</option>
                </select>
                </label>
                    <br/>
                <label>Cheese:
                <select
                    onChange={onChange} value={values.cheese}  name='cheese' id='cheese-dropdown'
                >
                    <option value='regular'>- Regular -</option>
                    <option value='none'>No Cheese</option>
                    <option value='light'>Light Cheese</option>
                    <option value='extra'>Extra Cheese` (+$1.50)`</option>
                </select>
                </label>
                    <br/>
                <label>Crust:
                <select
                    onChange={onChange} value={values.crust} name='crust' id='crust-dropdown'
                >
                    <option value='reg'>- Traditional Crust -</option>
                    <option value='thin'>Thin Crust</option>
                    <option value='stuffed'>Stuffed Crust</option>
                    <option value='gf'>Gluten Free</option>
                    <option value='deepdish'>Deep Dish</option>
                </select>
                </label>
            </div>
            <div className='form-group meats'>
                <h4>Add Meat:</h4>
                <br/>
                <label>Pepperoni
                    <input type="checkbox" name="pepperoni" checked={values.pepperoni} onChange={onChange} />
                </label>
                <label>Chicken
                    <input type="checkbox" name="chicken" checked={values.chicken} onChange={onChange} />
                </label>
                <label>Sausage
                    <input type="checkbox" name="sausage" checked={values.sausage} onChange={onChange} />
                </label>
                <label>Bacon
                    <input type="checkbox" name="bacon" checked={values.bacon} onChange={onChange} />
                </label>
                <label>Ham
                    <input type="checkbox" name="ham" checked={values.ham} onChange={onChange} />
                </label>
            </div>
    
            <div className='form-group veggies'>
                <h4>Add Veggies:</h4>
                    <br/>
                <label>Spinach
                    <input type="checkbox" name="spinach" checked={values.spinach} onChange={onChange} />
                </label>
                <label>Tomatoes
                    <input type="checkbox" name="tomatoes" checked={values.tomatoes} onChange={onChange} />
                </label>
                <label>Onions
                    <input type="checkbox" name="onions" checked={values.onions} onChange={onChange} />
                </label>
                <label>Peppers
                    <input type="checkbox" name="peppers" checked={values.peppers} onChange={onChange} />
                </label>
                <label>Pineapple
                    <input type="checkbox" name="pineapple" checked={values.pineapple} onChange={onChange} />
                </label>
                <label>Mushrooms
                    <input type="checkbox" name="mushrooms" checked={values.mushrooms} onChange={onChange} />
                </label>
                <label>Olives
                    <input type="checkbox" name="olives" checked={values.olives} onChange={onChange} />
                </label>
            </div>
            <div>
                {/* ////////// RADIO BUTTONS ////////// */}
                <label>Pickup
                <input 
                    type="radio"
                    name="method"
                    value="pickup"
                    onChange={onChange}
                    checked={values.civil === 'pickup'}
                />
                </label>
                <label>Delivery
                <input 
                    type="radio"
                    name="method"
                    value="delivery"
                    onChange={onChange}
                    checked={values.civil === 'delivery'}
                />
                </label>
                    <br/>
                <label> Special Instructions:
                <input
                    value={values.special} onChange={onChange} name='special' type='textarea'
                    id='special-text'
                />
                </label>
            </div>
        </div>
        <button id="order-button" onClick={successRoute} disabled={disabled}>Place Order</button>
        </form>
    )
}