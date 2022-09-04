import React from "react";
import {TPokemon} from "../interface";
import PokemonList from "./PokemonList";
import "./pokemon.css";
interface Props {
   pokemons: TPokemon[];
}

const PokemonCollection: React.FC<Props> = (props) => {
   const {pokemons} = props;
   return (
      <section className="collection-container">
         {pokemons.map((pokemon) => {
            return <PokemonList key={pokemon.id} abilities={pokemon.abilities} id={pokemon.id} name={pokemon.name} image={pokemon.sprites.front_default} />;
         })}
      </section>
   );
};
export default PokemonCollection;
