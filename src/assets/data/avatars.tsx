import Ash from '@/assets/img/ash.png';
import Dawn from '@/assets/img/dawn.png';
import tsubomi from '@/assets/img/tsubomi.png';

export type AvatarsType = {
    id: number;
    name: string;
    photo: string | any;
};

const avatars = [
    {
        id: 0,
        name: 'Ash',
        photo: Ash,
    },
    {
        id: 1,
        name: 'Dawn',
        photo: Dawn,
    },
    {
        id: 2,
        name: 'Tsubomi',
        photo: tsubomi,
    },
];

export default avatars;
