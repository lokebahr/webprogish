import { useState } from 'react';
import Salad from './Salad';

function Select({ label, options, value, onChange, id }) {
  return (
    <div>
      <label htmlFor={id} className="form-label">{label}</label>
      <select id={id} className="form-select" value={value} onChange={onChange}>
        <option value="" disabled>Välj ett alternativ</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function ComposeSalad({ inventory, addSaladToCart }) {
  // Making lists of all different ingredients
  const foundationList = Object.keys(inventory).filter(name => inventory[name].foundation);
  const proteinList = Object.keys(inventory).filter(name => inventory[name].protein);
  const extraList = Object.keys(inventory).filter(name => inventory[name].extra);
  const dressingList = Object.keys(inventory).filter(name => inventory[name].dressing);

  // State for form selections
  const [foundation, setFoundation] = useState("");
  const [protein, setProtein] = useState("");
  const [dressing, setDressing] = useState("");
  const [extras, setExtras] = useState({});

  // Handle extras change (checkbox)
  const handleExtras = (e) => {
    const { name, checked } = e.target;
    setExtras((prevExtras) => ({
      ...prevExtras,
      [name]: checked,
    }));
  };

  // Handle form submission
 // Handle form submission
// Handle form submission
const handleSubmit = (e) => {
  e.preventDefault(); // Prevent page refresh

  // Collect the selected ingredients with their properties from inventory
  const selectedIngredients = {
    foundation: inventory[foundation],  // Get foundation object from inventory
    protein: inventory[protein],        // Get protein object from inventory
    dressing: inventory[dressing],      // Get dressing object from inventory
    extras: Object.keys(extras)
      .filter(extra => extras[extra])   // Only include selected extras
      .map(extra => inventory[extra])   // Map extras to their ingredient objects
  };

  // Flattening all selected ingredients, including extras
  const allIngredients = {
    foundation: selectedIngredients.foundation,
    protein: selectedIngredients.protein,
    dressing: selectedIngredients.dressing,
    ...selectedIngredients.extras.reduce((acc, extra) => {
      acc[extra.name] = extra;  // Use the name property of the extra
      return acc;
    }, {})
  };

  // Create a new Salad instance with all the ingredients (including extras)
  const salad = new Salad({ ingredients: allIngredients });

  addSaladToCart(salad);

  console.log("Salad submitted:", salad);
  console.log(salad.getPrice());
};


  return (
    <form onSubmit={handleSubmit}>
      <Select
        label="Välj bas"
        options={foundationList}
        value={foundation}
        onChange={(e) => setFoundation(e.target.value)}
        id="foundation"
      />

      <Select
        label="Välj protein"
        options={proteinList}
        value={protein}
        onChange={(e) => setProtein(e.target.value)}
        id="protein"
      />

      <Select
        label="Välj dressing"
        options={dressingList}
        value={dressing}
        onChange={(e) => setDressing(e.target.value)}
        id="dressing"
      />

      <fieldset>
        <legend>Välj extra tillbehör</legend>
        {extraList.map(extra => (
          <div key={extra} className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id={extra}
              name={extra}
              checked={extras[extra] || false}
              onChange={handleExtras}
            />
            <label className="form-check-label" htmlFor={extra}>
              {extra}
            </label>
          </div>
        ))}
      </fieldset>

      {/* Add the submit button */}
      <button type="submit" className="btn btn-primary mt-3">Lägg till i korgen</button>
    </form>
  );
}

export default ComposeSalad;
