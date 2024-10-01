import { useState } from 'react';
import Salad from './Salad';
import { useOutletContext, useNavigate } from 'react-router-dom';

function Select({ label, options, value, onChange, id, required, feedback }) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">{label}</label>
      <select
        id={id}
        className="form-select"
        value={value}
        onChange={onChange}
        required={required}
      >
        <option value="">Gör ditt val</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className="invalid-feedback">{feedback.invalid}</div>
      <div className="valid-feedback">{feedback.valid}</div>
    </div>
  );
}

/*
function CheckboxGroup({ label, options, selectedOptions, onChange }) {
  return (
    <fieldset>
      <legend>{label}</legend>
      {options.map(option => (
        <div key={option} className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id={option}
            value={option}
            checked={selectedOptions.includes(option)}
            onChange={(e) => onChange(e.target.value, e.target.checked)}
          />
          <label className="form-check-label" htmlFor={option}>
            {option}
          </label>
        </div>
      ))}
    </fieldset>
  );
}*/
 // Assuming Select is in the same folder

function ComposeSalad() {
  const { inventory, addSaladToCart } = useOutletContext();
  const [foundation, setFoundation] = useState("");
  const [protein, setProtein] = useState("");
  const [dressing, setDressing] = useState("");
  const [extras, setExtras] = useState([]);
  const [validated, setValidated] = useState(false);

  const navigate = useNavigate();

 
  const foundationList = Object.keys(inventory).filter(name => inventory[name].foundation);
  const proteinList = Object.keys(inventory).filter(name => inventory[name].protein);
  const dressingList = Object.keys(inventory).filter(name => inventory[name].dressing);
  const extraList = Object.keys(inventory).filter(name => inventory[name].extra);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      let salad = new Salad();
      salad.add('foundation', inventory[foundation]);
      salad.add('protein', inventory[protein]);
      extras.forEach(extra => salad.add('extra', inventory[extra]));
      salad.add('dressing', inventory[dressing]);
      addSaladToCart(salad);

      
      setFoundation("");
      setProtein("");
      setDressing("");
      setExtras([]);

      navigate(`/view-order/confirm/${salad.uuid}`);
    }
    
    setValidated(true);
  };

  const handleExtrasChange = (extra, isSelected) => {
    setExtras(prevExtras =>
      isSelected ? [...prevExtras, extra] : prevExtras.filter(e => e !== extra)
    );
  };

  return (
    <form noValidate onSubmit={handleSubmit} className={validated ? 'was-validated' : ''}>
      
      <Select
        label="Välj bas"
        options={foundationList}
        value={foundation}
        onChange={e => setFoundation(e.target.value)}
        id="foundation"
        required={true}
        feedback={{
          invalid: "Välj en bas.",
          valid: "Ser bra ut!"
        }}
      />

      <Select
        label="Välj protein"
        options={proteinList}
        value={protein}
        onChange={e => setProtein(e.target.value)}
        id="protein"
        required={true}
        feedback={{
          invalid: "Välj ett protein.",
          valid: "Ser bra ut!"
        }}
      />

      <Select
        label="Välj dressing"
        options={dressingList}
        value={dressing}
        onChange={e => setDressing(e.target.value)}
        id="dressing"
        required={true}
        feedback={{
          invalid: "Välj en dressing.",
          valid: "Ser bra ut!"
        }}
      />

      {/* Handle extras here (checkboxes) */}
      <fieldset className="mb-3">
        <legend>Välj extra tillbehör</legend>
        {extraList.map(extra => (
          <div key={extra} className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id={extra}
              name={extra}
              checked={extras.includes(extra)}
              onChange={e => handleExtrasChange(extra, e.target.checked)}
            />
            <label className="form-check-label" htmlFor={extra}>
              {extra}
            </label>
          </div>
        ))}
      </fieldset>

      <button type="submit" className="btn btn-primary">Lägg till i korgen</button>
    </form>
  );
}

export default ComposeSalad;
