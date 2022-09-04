import React, {useEffect, useState} from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import PokemonCollection from "./components/PokemonCollection";
import {TPokemon} from "./interface";
interface Pokemon {
   name: string;
   url: string;
}

const App: React.FC = () => {
   const [pokemons, setPokemons] = useState<TPokemon[]>([]);
   const [nextUrl, setNextUrl] = useState<string>("");
   const [loading, setLoading] = useState<Boolean>(false);
   useEffect(() => {
      const getPokemonApi = async () => {
         setLoading(true);
         const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20&offset=20");
         setNextUrl(res.data.next);
         res.data.results.map(async (pokemon: Pokemon) => {
            const pokemonDetails = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
            setPokemons((pokemons) => [...pokemons, pokemonDetails.data]);
            setLoading(false);
         });
      };
      getPokemonApi();
   }, []);
   const nextPage = async () => {
      setLoading(true);
      const res = await axios.get(nextUrl);
      setNextUrl(res.data.next);
      res.data.results.map(async (p: Pokemon) => {
         const pokemonDetails = await axios.get(`https://pokeapi.co/api/v2/pokemon/${p.name}`);
         setPokemons((pokemons) => [...pokemons, pokemonDetails.data]);
         setLoading(false);
      });
   };
   return (
      <div className="App">
         <div className="container">
            <header className="pokemon-header">Pokemon</header>
            <PokemonCollection pokemons={pokemons} />
            <div
               className="btn"
               onClick={() => {
                  nextPage();
               }}
            >
               <button>{loading ? "Loading" : " Add more"}</button>
            </div>
         </div>
      </div>
   );
};

export default App;
