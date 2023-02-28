const getIdByLink = (link: string) => {
    if (link) {
        let id = link?.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', '');
        return Number(id);
    }
    return 0;
};

export const getTypeIdByLink = (link: string) => {
    if (link) {
        let id = link?.replace('https://pokeapi.co/api/v2/type/', '').replace('/', '');
        return Number(id);
    }
    return 0;
};

export default getIdByLink;
