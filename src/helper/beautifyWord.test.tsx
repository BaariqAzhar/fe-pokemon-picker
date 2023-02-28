import beautifyWord from "./beautifyWord";

describe('helper/function beautifyWord', () => {

    test('Uppercase first letter and Remove "-"', () => {
        expect(beautifyWord('rain-dish')).toBe('Rain dish')

        expect(beautifyWord('run-away')).toBe('Run away')

        expect(beautifyWord('shed-skin')).toBe('Shed skin')
    })

    test('Uppercase first letter', () => {
        expect(beautifyWord('chlorophyll')).toBe('Chlorophyll')

        expect(beautifyWord('blaze')).toBe('Blaze')
    })

})