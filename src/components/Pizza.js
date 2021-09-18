import React from 'react'

export default function Pizza({ details }) {
    if (!details) {
        return <h3>Working fetching your pizza&apos;s details...</h3>
    }

    return (
        <div className='pizza container'>
            <h2>{details.name}</h2>
            <p>Size: {details.size}</p>
            <p>Sauce: {details.sauce}</p>
            <p>Cheese: {details.cheese}</p>
            <p>Crust: {details.crust}</p>
            <p>Special Instructions: {details.special}</p>
            <p></p>

        </div>
    )
}
