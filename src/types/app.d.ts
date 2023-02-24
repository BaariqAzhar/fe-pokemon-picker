declare module 'app-types' {
    type PokemonType = {
        name?: string
        url?: string
        id?: number
        species?: string
        type?: string[]
        ability?: string[]
    }

    type PokemonTypeType = {
        name?: string
        url?: string
        id?: number
    }
}
