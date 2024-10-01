import React from 'react';
import { useParams, useOutletContext } from 'react-router-dom';

function ViewOrder() {
  const { cart, removeSaladFromCart } = useOutletContext();
  const { uuid } = useParams();  // Get the UUID from the URL

  return (
    <div className="view-order">
      <h3>Din beställning</h3>

      {/* If UUID is present, show confirmation message */}
      {uuid && <p>Beställningen för sallad {uuid} har lagts till.</p>}

      {cart.length > 0 ? (
        <ul>
          {cart.map(salad => (
            <li key={salad.uuid}>
              <p>Sallad ID: {salad.uuid}</p>
              <p>Pris: {salad.getPrice()} SEK</p>
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

