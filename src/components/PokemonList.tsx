import React from "react";
interface TProps {
   id: number;
   name: string;
   image: string;
   abilities: string;
}
const PokemonList: React.FC<TProps> = (props) => {
   const {name, id, image} = props;
   return (
      <div>
         <section className="pokemon-list-container">
            <p className="pokemon-name">{name}</p>
            <img src={image} alt="pokemon" />
         </section>
      </div>
   );
};

export default PokemonList;
