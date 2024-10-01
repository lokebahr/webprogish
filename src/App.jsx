import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import inventory from './inventory.mjs';
import ComposeSalad from './ComposeSalad';
import Salad from './Salad';
import ViewOrder from './ViewOrder';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Navbar from './Navbar';


function App() {
  const [cart, setCart] = useState([]);

  const addSaladToCart = (salad) => {
    console.log('Adding Salad to Cart:', salad);
    setCart((prevCart) => [...prevCart, salad]);
    console.log("Hej"); 
  };

  const removeSaladFromCart = (uuid) => {
    setCart((prevCart) => prevCart.filter(salad => salad.uuid !== uuid)); 
  };

  let extras = Object.keys(inventory).filter(name => inventory[name].extra);

  return (
    <div className="container py-4">
      <Header />
      <Navbar />
      <Outlet context={{ inventory, addSaladToCart, cart, removeSaladFromCart /*shoppingBasket*/ }} />
      <Footer />
    </div>
    );
}

export default App;
/*
<ComposeSalad inventory={inventory} addSaladToCart={addSaladToCart} />


<ViewOrder shoppingCart={cart} removeSaladFromCart={removeSaladFromCart} />
*/
