import beautifyWord from "@/helper/beautifyWord";
import { API_LIMIT_POKE_LIST, API_URL_POKE } from "@/helper/constants";
import getIdByLink, { getTypeIdByLink } from "@/helper/getIdgetIdByLink";
import { PokemonType } from "app-types";
import axios from "axios";
import { ReactElement, ReactNode, useEffect, useReducer } from "react"
import HomeContext, { initialState } from "./HomeContext";
import HomeReducer, { compareAscending, TYPE } from "./HomeReducer";

type HomeContextProviderProps = {
    children: ReactNode
}

const HomeContextProvider = ({ children }: HomeContextProviderProps): ReactElement => {

    const [state, dispatcher] = useReducer(HomeReducer, initialState);

    const fetchPokemonList = async () => {
        // const baseUrl = `${API_URL_POKE}pokemon/?limit=${API_LIMIT_POKE_LIST}`;
        let baseUrl = `${API_URL_POKE}pokemon/`;

        if (state.search) {
            baseUrl = `${baseUrl}${state.search.toLowerCase()}`
            try {
                dispatcher({
                    type: TYPE.POKEMONLIST_IS_LOADING,
                    payload: true
                })
                const pokemons = [];
                const { data } = await axios.get(baseUrl);
                const pokemon = {
                    name: beautifyWord(data?.name || ''),
                    ability: data?.abilities?.map((item: any) => beautifyWord(item?.ability?.name)),
                    id: data?.id,
                    species: beautifyWord(data?.species?.name),
                    type: data?.types?.map((item: any) => beautifyWord(item?.type?.name)),
                }
                pokemons.push(pokemon)
                return pokemons || []
            } catch (error) {
                console.error(error);
                return []
            } finally {
                dispatcher({
                    type: TYPE.POKEMONLIST_IS_LOADING,
                    payload: false
                })
            }
        } else {
            baseUrl = `${baseUrl}`
            try {
                dispatcher({
                    type: TYPE.POKEMONLIST_IS_LOADING,
                    payload: true
                })
                let pokemons = [];
                const { data } = await axios.get(baseUrl)
                pokemons = data.results;
                for (const key in pokemons) {
                    const { data } = await axios.get(pokemons?.[key]?.url);
                    pokemons[key].name = beautifyWord(pokemons?.[key]?.name)
                    pokemons[key].abilities = data?.abilities;
                    pokemons[key].id = getIdByLink(pokemons?.[key]?.url);
                    pokemons[key].species = beautifyWord(data?.species?.name);
                    pokemons[key].type = data?.types?.map((item: any) => beautifyWord(item?.type?.name));
                    pokemons[key].ability = data?.abilities?.map((item: any) => beautifyWord(item?.ability?.name))
                }
                const ascendingPokemons = pokemons.sort(compareAscending)
                return ascendingPokemons;
            } catch (error) {
                console.error(error);
                return []
            } finally {
                dispatcher({
                    type: TYPE.POKEMONLIST_IS_LOADING,
                    payload: false
                })
            }
        }
    }

    const fetchPokemonType = async () => {
        const baseUrl = `${API_URL_POKE}type`

        try {
            const { data } = await axios.get(baseUrl);
            let pokemonTypes = data?.results;
            for (const key in pokemonTypes) {
                pokemonTypes[key].id = getTypeIdByLink(pokemonTypes?.[key]?.url);
                pokemonTypes[key].name = beautifyWord(pokemonTypes?.[key]?.name)
            }
            return pokemonTypes;
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        const getPokemonList = async () => {
            const pokemonList = await fetchPokemonList();
            dispatcher({
                type: TYPE.FIRST,
                payload: pokemonList
            })
        }
        getPokemonList();

        const getPokemonType = async () => {
            const pokemonTypeData = await fetchPokemonType();
            dispatcher({
                type: TYPE.FIRST_FETCH_POKEMON_TYPE,
                payload: pokemonTypeData
            })
        }
        getPokemonType();
    }, []);

    useEffect(() => {
        const getPokemonList = async () => {
            const pokemonList = await fetchPokemonList();
            dispatcher({
                type: TYPE.CHANGE_SEARCH_REFETCH,
                payload: pokemonList
            })
        }
        getPokemonList();
    }, [state.search])

    return <HomeContext.Provider value={{ state, dispatcher }}>{children}</HomeContext.Provider>;
}

export default HomeContextProvider;