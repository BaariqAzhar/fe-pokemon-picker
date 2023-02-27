import HomeContext from "@/context/home/HomeContext"
import { useContext } from "react"
import PokemonsList from "../global/PokemonList"

const HomePokemonList = () => {
    const { state } = useContext(HomeContext);
    const { pokemonList } = state;

    if (pokemonList?.isLoading) {
        return (
            <>Loading...</>
        )
    }

    return (
        <PokemonsList pokemons={pokemonList?.visible} />
    )
}

export default HomePokemonList