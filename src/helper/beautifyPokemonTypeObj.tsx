import beautifyWord from './beautifyWord';

const beautifyPokemonTypeObj = (data: any) => {
    const tempImages = [];
    for (const key in data?.sprites) {
        if (typeof data?.sprites?.[key] === 'string') {
            tempImages.push(data?.sprites?.[key]);
        }
    }

    const tempStats = [];
    for (const key in data?.stats) {
        tempStats.push({
            name: beautifyWord(data?.stats?.[key]?.stat?.name),
            point: data?.stats?.[key]?.base_stat,
        });
    }

    const pokemon = {
        name: beautifyWord(data?.name || ''),
        ability: data?.abilities?.map((item: any) => beautifyWord(item?.ability?.name)),
        id: data?.id,
        species: beautifyWord(data?.species?.name),
        type: data?.types?.map((item: any) => beautifyWord(item?.type?.name)),
        images: tempImages,
        stats: tempStats,
        weight: data?.weight,
    };

    return pokemon;
};

export default beautifyPokemonTypeObj;
