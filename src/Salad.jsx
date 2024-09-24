import { v4 as uuidv4 } from 'uuid';


class Salad {
    static instanceCounter = 0;
    
    constructor(salad) {
      this.id = 'salad_' + Salad.instanceCounter++; 
  
      
  
      if (salad) {
        this.ingredients = { ...salad.ingredients };
        this.uuid = uuidv4(); 
      } else {
        this.ingredients = {};
        this.uuid = uuidv4(); 
      }
    }
    static parse(json) {
      let parsedData;
  
      
      if (typeof json === "string") {
        parsedData = JSON.parse(json);
      } else {
        parsedData = json;
      }
  
      
      if (Array.isArray(parsedData)) {
        return parsedData.map(saladObj => new Salad(saladObj));
      } 
      
      else {
        return new Salad(parsedData);
      }
    }
     
    
    add(name, properties) { 
      this.ingredients[name] = properties;
      return this;
    }
    remove(name) {
      delete this.ingredients[name];
      return this;
     }
     
  }
  
  Salad.prototype.getPrice = function(){
    const initialPrice = 0;
    const sumWithInitial = Object.values(this.ingredients) 
      .reduce((accumulator, currentValue) => accumulator + currentValue.price,
      initialPrice);
  
    return sumWithInitial;
  }
  
  Salad.prototype.count = function(property){
    const prop = Object.values(this.ingredients);
    return prop
      .filter(ingredient => ingredient[property])
      .length;
  }

export default Salad;