import React from 'react';

function ViewOrder({ shoppingCart, removeSaladFromCart }) {
  return (
    <div className="view-order">
      <h3>Din beställning</h3>
      {shoppingCart.length > 0 ? (
        <ul>
          {shoppingCart.map(salad => (
            <li key={salad.uuid}>
              <p>Sallad ID: {salad.uuid}</p>
              <p>Pris: {salad.getPrice()} SEK</p>
              <p>Ingredienser:</p>
              <ul>
                {Object.entries(salad.ingredients).map(([name, ingredient]) => (
                  <li key={name}>
                    {name}: {ingredient.name} - {ingredient.price} SEK
                  </li>
                ))}
              </ul>
              <button onClick={() => removeSaladFromCart(salad.uuid)}>Ta bort</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Din korg är tom.</p>
      )}
    </div>
  );
}

export default ViewOrder;

