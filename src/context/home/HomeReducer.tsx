import { PokemonType } from "app-types";
import { SORT_TYPE } from "./HomeContext";

export enum TYPE {
    FIRST = 'FIRST',
    FIRST_FETCH_POKEMON_TYPE = 'FIRST_FETCH_POKEMON_TYPE',
    POKEMONLIST_IS_LOADING = 'POKEMONLIST_IS_LOADING',
    CHANGE_SORT = 'CHANGE_SORT',
    CHANGE_TYPE = 'CHANGE_TYPE',
    CHANGE_SEARCH = 'CHANGE_SEARCH',
    CHANGE_SEARCH_REFETCH = 'CHANGE_SEARCH_REFETCH'
}

export type ActionType = {
    type: TYPE,
    payload: any
}

export function compareAscending(a: PokemonType, b: PokemonType) {
    if (typeof a.name === 'undefined' || typeof b.name === 'undefined') {
        return 0
    }

    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }

    return 0;
}

function compareDescending(a: PokemonType, b: PokemonType) {
    if (typeof a.name === 'undefined' || typeof b.name === 'undefined') {
        return 0
    }

    if (a.name > b.name) {
        return -1;
    }
    if (a.name < b.name) {
        return 1;
    }

    return 0;
}

const HomeReducer = (prevState: any, action: ActionType) => {
    const { type, payload } = action;

    switch (type) {
        case TYPE.FIRST:
            return {
                ...prevState,
                pokemonList: {
                    ...prevState.pokemonList,
                    default: payload,
                    visible: payload,
                },
            }
        case TYPE.FIRST_FETCH_POKEMON_TYPE:
            return {
                ...prevState,
                pokemonType: {
                    ...prevState.pokemonType,
                    data: payload
                }
            }
        case TYPE.POKEMONLIST_IS_LOADING:
            return {
                ...prevState,
                pokemonList: {
                    ...prevState.pokemonList,
                    isLoading: payload
                }
            }
        case TYPE.CHANGE_SORT: {
            let tempVisible = [...prevState.pokemonList.default];

            if (payload === SORT_TYPE.ASCENDING) {
                tempVisible = tempVisible.sort(compareAscending);
            } else if (payload === SORT_TYPE.DESCENDING) {
                tempVisible = tempVisible.sort(compareDescending);
            }

            return {
                ...prevState,
                pokemonList: {
                    ...prevState.pokemonList,
                    visible: tempVisible
                },
                sort: payload,
            }
        }
        case TYPE.CHANGE_TYPE: {
            if (payload.length === 0) {
                return {
                    ...prevState,
                    type: payload,
                    pokemonList: {
                        ...prevState.pokemonList,
                        visible: prevState.pokemonList.default
                    }
                }
            }

            let tempVisible = [...prevState.pokemonList.visible];

            tempVisible = tempVisible.filter((item) => {
                return item?.type?.some((r: string) => payload.indexOf(r) >= 0)
            })

            return {
                ...prevState,
                type: payload,
                pokemonList: {
                    ...prevState.pokemonList,
                    visible: tempVisible
                }
            }
        }
        case TYPE.CHANGE_SEARCH: {
            return {
                ...prevState,
                search: payload,
            }
        }
        case TYPE.CHANGE_SEARCH_REFETCH: {
            return {
                ...prevState,
                pokemonList: {
                    ...prevState.pokemonList,
                    default: payload,
                    visible: payload
                }
            }
        }
        default:
            return { ...prevState }
    }
}

export default HomeReducer;