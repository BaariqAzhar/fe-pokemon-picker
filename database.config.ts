import Dexie from 'dexie'

const database = new Dexie('database')
database.version(2).stores({
    pokemons: 'id, name, url, species, type, ability, images, stats, weight',
})

export const pokemonsTable = database.table('pokemons')

export default database
