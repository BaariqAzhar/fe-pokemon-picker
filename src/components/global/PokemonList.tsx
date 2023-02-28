import HomeContext from '@/context/home/HomeContext';
import { useContext } from 'react';
import { PokemonType } from 'app-types';
import { Row, Col, Image, Typography, Divider, Button, Card } from 'antd';
import fallbackImg from '@/assets/img/fallbackImg';
import { useRouter } from 'next/router';
import { RightOutlined } from '@ant-design/icons';
import PokeballIcon from '@/assets/img/pokeball-icon.png';
import PokeballMonochromeIcon from '@/assets/img/pokeball-monochrome-icon.png';
import ImageNext from 'next/image';
import useIsCaught from '@/helper/useIsCaught';

type PokemonItemType = {
    data: PokemonType;
};

const PokemonItem = ({ data }: PokemonItemType) => {
    const router = useRouter();

    const { isCaught } = useIsCaught(data?.id || 0);

    const onClickGoToDetail = () => {
        router.push(`/detail/${data?.id}`);
    };

    return (
        <>
            <Row gutter={[8, 0]}>
                <Col span={5}>
                    <Row justify={'end'}>
                        <Col>
                            <Image
                                preview={false}
                                alt={fallbackImg}
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data?.id}.png`}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col span={12}>
                    <Row gutter={[0, 2]}>
                        <Col span={24}>
                            <Typography.Text style={{ fontSize: 20 }}>{data?.name}</Typography.Text>
                        </Col>
                        <Col span={24}>
                            <Typography.Text ellipsis>🗄️ {data?.type?.toString().replaceAll(',', ', ')}</Typography.Text>
                        </Col>
                        <Col span={24}>
                            <Typography.Text ellipsis>🗡️ {data?.ability?.toString().replaceAll(',', ', ')}</Typography.Text>
                        </Col>
                    </Row>
                </Col>
                <Col span={7}>
                    <Row gutter={[0, 8]}>
                        <Col span={24}>
                            <Row justify="center">
                                <Col>
                                    {isCaught ? (
                                        <ImageNext style={{ width: 30, height: 'auto' }} src={PokeballIcon} alt="" />
                                    ) : (
                                        <ImageNext style={{ width: 30, height: 'auto' }} src={PokeballMonochromeIcon} alt="" />
                                    )}
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24}>
                            <Row justify="center">
                                <Col>
                                    <Button type="link" onClick={onClickGoToDetail}>
                                        Detail <RightOutlined />{' '}
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Divider />
        </>
    );
};

type PokemonsListProps = {
    pokemons: PokemonType[];
};

const PokemonsList = ({ pokemons }: PokemonsListProps) => {
    return (
        <Row>
            {pokemons?.map((item: any) => {
                return (
                    <Col key={item.id} span={24}>
                        <PokemonItem data={item} />
                    </Col>
                );
            })}
        </Row>
    );
};

export default PokemonsList;
