import getIdByLink, { getTypeIdByLink } from "./getIdgetIdByLink";

describe('helper/function getIdByLink & getTypeIdByLink', () => {

    test('Get pokemon id by link', () => {
        expect(getIdByLink('https://pokeapi.co/api/v2/pokemon/7/')).toBe(7)

        expect(getIdByLink('https://pokeapi.co/api/v2/pokemon/8/')).toBe(8)

        expect(getIdByLink('https://pokeapi.co/api/v2/pokemon/2/')).toBe(2)
    })

    test('Get Pokemon Type Id by link', () => {
        expect(getTypeIdByLink('https://pokeapi.co/api/v2/type/4/')).toBe(4)

        expect(getTypeIdByLink('https://pokeapi.co/api/v2/type/5/')).toBe(5)

        expect(getTypeIdByLink('https://pokeapi.co/api/v2/type/2/')).toBe(2)
    })
})