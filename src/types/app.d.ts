declare module 'app-types' {
    type Stat = {
        name?: string
        point?: number
    }

    type PokemonType = {
        name?: string
        url?: string
        id?: number
        species?: string
        type?: string[]
        ability?: string[]
        images?: string[]
        stats?: Stat[]
        weight?: number
    }

    type PokemonTypeType = {
        name?: string
        url?: string
        id?: number
    }
}
