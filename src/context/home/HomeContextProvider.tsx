import beautifyPokemonTypeObj from '@/helper/beautifyPokemonTypeObj';
import beautifyWord from '@/helper/beautifyWord';
import { API_URL_POKE } from '@/helper/constants';
import { getTypeIdByLink } from '@/helper/getIdgetIdByLink';
import axios from 'axios';
import { ReactElement, ReactNode, useEffect, useReducer } from 'react';
import HomeContext, { initialState } from './HomeContext';
import HomeReducer, { compareAscending, TYPE } from './HomeReducer';

type HomeContextProviderProps = {
    children: ReactNode;
};

const HomeContextProvider = ({ children }: HomeContextProviderProps): ReactElement => {
    const [state, dispatcher] = useReducer(HomeReducer, initialState);

    const fetchPokemonList = async () => {
        let baseUrl = `${API_URL_POKE}pokemon/`;

        if (state.search) {
            baseUrl = `${baseUrl}${state.search.toLowerCase()}`;
            try {
                dispatcher({
                    type: TYPE.POKEMONLIST_IS_LOADING,
                    payload: true,
                });
                const pokemons = [];
                const { data } = await axios.get(baseUrl);

                const pokemon = beautifyPokemonTypeObj(data);
                pokemons.push(pokemon);
                return pokemons;
            } catch (error) {
                console.error(error);
                return [];
            } finally {
                dispatcher({
                    type: TYPE.POKEMONLIST_IS_LOADING,
                    payload: false,
                });
            }
        } else {
            baseUrl = `${baseUrl}`;
            try {
                dispatcher({
                    type: TYPE.POKEMONLIST_IS_LOADING,
                    payload: true,
                });
                const pokemons = [];
                const { data } = await axios.get(baseUrl);
                const datas = data?.results;
                for (const key in datas) {
                    const { data } = await axios.get(datas?.[key]?.url);
                    const pokemon = beautifyPokemonTypeObj(data);
                    pokemons.push(pokemon);
                }
                const ascendingPokemons = pokemons.sort(compareAscending);
                return ascendingPokemons;
            } catch (error) {
                console.error(error);
                return [];
            } finally {
                dispatcher({
                    type: TYPE.POKEMONLIST_IS_LOADING,
                    payload: false,
                });
            }
        }
    };

    const fetchPokemonType = async () => {
        const baseUrl = `${API_URL_POKE}type`;

        try {
            const { data } = await axios.get(baseUrl);
            let pokemonTypes = data?.results;
            for (const key in pokemonTypes) {
                pokemonTypes[key].id = getTypeIdByLink(pokemonTypes?.[key]?.url);
                pokemonTypes[key].name = beautifyWord(pokemonTypes?.[key]?.name);
            }
            return pokemonTypes;
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const getPokemonList = async () => {
            const pokemonList = await fetchPokemonList();
            dispatcher({
                type: TYPE.FIRST_FETCH_POKEMON_LIST,
                payload: pokemonList,
            });
        };
        getPokemonList();

        const getPokemonType = async () => {
            const pokemonTypeData = await fetchPokemonType();
            dispatcher({
                type: TYPE.FIRST_FETCH_POKEMON_TYPE,
                payload: pokemonTypeData,
            });
        };
        getPokemonType();
    }, []);

    useEffect(() => {
        const getPokemonList = async () => {
            const pokemonList = await fetchPokemonList();
            dispatcher({
                type: TYPE.CHANGE_SEARCH_REFETCH,
                payload: pokemonList,
            });
        };
        getPokemonList();
    }, [state.search]);

    useEffect(() => {
        dispatcher({
            type: TYPE.AFTER_CHANGE_SORT_N_TYPE,
            payload: null,
        });
    }, [state.sort, JSON.stringify(state.type)]);

    return <HomeContext.Provider value={{ state, dispatcher }}>{children}</HomeContext.Provider>;
};

export default HomeContextProvider;
