import { createContext, Dispatch } from "react";

export const SORT_TYPE = {
    ASCENDING: "ASCENDING",
    DESCENDING: "DESCENDING",
};

export const initialState = {
    pokemonList: {
        default: [],
        visible: [],
        isLoading: false,
    },
    pokemonType: {
        data: [],
        isLoading: false
    },
    sort: SORT_TYPE.ASCENDING,
    type: [],
    search: '',
}

const initial = {
    state: initialState,
    dispatcher: () => null
}

const HomeContext = createContext<any>(initial);

export default HomeContext;
