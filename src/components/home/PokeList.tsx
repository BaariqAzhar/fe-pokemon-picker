import HomeContext from "@/context/home/HomeContext"
import { Skeleton } from "antd";
import { useContext } from "react"
import PokemonsList from "../global/PokemonList"

const HomePokemonList = () => {
    const { state } = useContext(HomeContext);
    const { pokemonList } = state;

    if (pokemonList?.isLoading) {
        return (
            <>
                {[0, 1, 2, 3].map((item) =>
                    <Skeleton key={item} active />
                )}
            </>
        )
    }

    return (
        <PokemonsList pokemons={pokemonList?.visible} />
    )
}

export default HomePokemonList