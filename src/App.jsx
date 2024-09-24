import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import inventory from './inventory.mjs';
import ComposeSalad from './ComposeSalad';
import Salad from './Salad';
import ViewOrder from './ViewOrder';

function App() {
  const [cart, setCart] = useState([]);

  const addSaladToCart = (salad) => {
    setCart((prevCart) => [...prevCart, salad]); // Add the new salad to the cart
  };

  const removeSaladFromCart = (uuid) => {
    setCart((prevCart) => prevCart.filter(salad => salad.uuid !== uuid)); // Remove salad by uuid
  };

  let extras = Object.keys(inventory).filter(name => inventory[name].extra);

  return (
    <div className="container py-4">
      <header className="pb-3 mb-4 border-bottom">
        <span className="fs-4">Min egen salladsbar</span>
      </header>

      <div className="container col-12">
        <div className="row h-200 p-5 bg-light border rounded-3">
          <h2>Välj innehållet i din sallad</h2>
          {extras.map(name => (
            <div key={name} className="col-4">{name}</div>
          ))}
        </div>
      </div>

      {/* ComposeSalad component */}
      <ComposeSalad inventory={inventory} addSaladToCart={addSaladToCart} />

      {/* ViewOrder component */}
      <ViewOrder shoppingCart={cart} removeSaladFromCart={removeSaladFromCart} />

      <footer className="pt-3 mt-4 text-muted border-top">
        EDAF90 - webprogrammering
      </footer>
    </div>
  );
}

export default App;
