import { pokemonsTable } from 'database.config';
import { useEffect, useState } from 'react';

const useIsCaught = (id: number) => {
    const [isCaught, setIsCaught] = useState(false);

    const checkIsCaught = async () => {
        const res = await pokemonsTable.where('id').equals(id).toArray();
        if (res.length > 0) {
            setIsCaught(true);
        } else {
            setIsCaught(false);
        }
    };

    useEffect(() => {
        checkIsCaught();
    }, [id]);

    return { isCaught, checkIsCaught };
};

export default useIsCaught;
