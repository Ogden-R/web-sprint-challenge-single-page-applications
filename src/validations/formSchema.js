import * as yup from 'yup';

const formSchema = yup.object().shape({
    name: yup
        .string()
        .trim()
        .required('Name is required!')
        .min(3, 'Name must be at least 3 characters long!'),
    email: yup
        .string()
        .email('Must be a valid email address!')
        .required('Email is required!'),
    size: yup
        .string()
        .oneOf(['small', 'med', 'lg', 'xl'], 'Role is required!'),
    sauce: yup
        .string()
        .oneOf(['marinara', 'none','bbq', 'alfredo-parm', 'ranch']),
    cheese: yup
        .string()
        .oneOf(['regular', 'none', 'light', 'extra']),
    crust: yup
        .string()
        .oneOf(['reg','thin', 'stuffed', 'gf', 'deepdish']),
    pepperoni: yup.boolean(), 
    chicken: yup.boolean(), 
    sausage: yup.boolean(), 
    bacon: yup.boolean(), 
    ham: yup.boolean(),
    spinach: yup.boolean(),
    tomatoes: yup.boolean(),
    onions: yup.boolean(),
    peppers: yup.boolean(),
    pineapple: yup.boolean(),
    mushrooms: yup.boolean(),
    olives: yup.boolean(),
    method: yup
        .string()
        .oneOf(['pickup','delivery'], 'Please select how you will be recieving your pizza today!'),
    special: yup
        .string(),
})
export default formSchema;
