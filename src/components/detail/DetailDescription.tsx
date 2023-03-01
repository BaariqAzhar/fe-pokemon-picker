import fallbackImg from '@/assets/img/fallbackImg';
import PokeballIcon from '@/assets/img/pokeball-icon.png';
import PokeballMonochromeIcon from '@/assets/img/pokeball-monochrome-icon.png';
import { cssCardBoxShadow, IMAGE_URL_POKE } from '@/helper/constants';
import useIsCaught from '@/helper/useIsCaught';
import { Button, Card, Col, Image, Row, Typography } from 'antd';
import { PokemonType } from 'app-types';
import { pokemonsTable } from 'database.config';
import NextImg from 'next/image';

type DetailDescriptionProps = {
    data: PokemonType;
};

const DetailDescription = ({ data }: DetailDescriptionProps) => {
    const { isCaught, checkIsCaught } = useIsCaught(data?.id || 0);

    const onClickCatch = async (event: any) => {
        const pokemon = {
            ...data,
            type: JSON.stringify(data?.type),
            ability: JSON.stringify(data?.ability),
            images: JSON.stringify(data?.images),
            stats: JSON.stringify(data?.stats),
        };
        try {
            const id = await pokemonsTable.add(pokemon);
            console.info(`A new customer was created with id ${id}`);
        } catch (error) {
            console.error(`Failed to add ${pokemon}: ${error}`);
        } finally {
            checkIsCaught();
        }
    };

    const onClickRelease = async (event: any) => {
        try {
            await pokemonsTable.delete(data?.id || 0);
            console.info(`Pokemon with id ${data?.id} is released`);
        } catch (error) {
            console.error(`Failed to release pokemon with id ${data?.id}: ${error}`);
        } finally {
            checkIsCaught();
        }
    };

    return (
        <Row gutter={[0, 16]}>
            <Col span={24}>
                <Card bodyStyle={{ padding: '32 8' }} style={{ boxShadow: cssCardBoxShadow }}>
                    <Row gutter={[16, 8]}>
                        <Col span={10}>
                            <Row justify="end">
                                <Col>
                                    <Image preview={false} alt={fallbackImg} src={`${IMAGE_URL_POKE}${data?.id}.png`} />
                                </Col>
                            </Row>
                        </Col>
                        <Col span={14}>
                            <Row>
                                <Col span={24}>
                                    <Typography.Text style={{ fontSize: 20 }}>{data?.name}</Typography.Text>
                                </Col>
                                <Col span={24}>
                                    <Typography.Text>🔬 Species: {data?.name}</Typography.Text>
                                </Col>
                                <Col span={24}>
                                    <Typography.Text ellipsis>🗄️ {data?.type?.toString().replaceAll(',', ', ')}</Typography.Text>
                                </Col>
                                <Col span={24}>
                                    <Typography.Text ellipsis>🗡️ {data?.ability?.toString().replaceAll(',', ', ')}</Typography.Text>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card>
            </Col>
            <Col span={24}>
                <Card bodyStyle={{ padding: '32 8' }} style={{ boxShadow: cssCardBoxShadow }}>
                    <Row gutter={16}>
                        <Col span={20}>
                            <Row gutter={[0, 8]}>
                                <Col span={24}>
                                    <Typography.Text>🎒 My Collection: {isCaught ? <>Yes </> : 'No'}</Typography.Text>
                                </Col>
                                <Col span={24}>
                                    <div className='catch_release_button'>
                                        {isCaught ? (
                                            <Button
                                                // className='catch_release_button' 
                                                className='release_button' onClick={onClickRelease}>Release the pokemon</Button>
                                        ) : (
                                            <Button
                                                // className='catch_release_button' 
                                                className='catch_button' type="primary" onClick={onClickCatch}>
                                                Catch the pokemon
                                            </Button>
                                        )}
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={4}>
                            {isCaught ? (
                                <div className='caught_img'>
                                    <NextImg style={{ width: 50, height: 'auto' }} alt="" src={PokeballIcon} />
                                </div>
                            ) : (
                                <div className='not_caught_img'>
                                    <NextImg style={{ width: 50, height: 'auto' }} alt="" src={PokeballMonochromeIcon} />
                                </div>
                            )}
                        </Col>
                    </Row>
                </Card>
            </Col>
            <Col span={24}>
                <Card bodyStyle={{ padding: '32 8' }} style={{ boxShadow: cssCardBoxShadow }}>
                    <Row gutter={[0, 8]}>
                        <Col span={24}>
                            <Typography.Text>🔬 Species: {data?.name}</Typography.Text>
                        </Col>
                        <Col span={24}>
                            <Row>
                                <Col span={24}>
                                    <Typography.Text>🛡️ Stats</Typography.Text>
                                </Col>
                                {data?.stats?.map((item, index) => {
                                    return (
                                        <Col key={index} span={10} offset={1}>
                                            <Typography.Text>
                                                {item?.name}: {item?.point}
                                            </Typography.Text>
                                        </Col>
                                    );
                                })}
                            </Row>
                        </Col>
                        <Col span={24}>
                            <Typography.Text>🧱 Weight: {data?.weight} Kg</Typography.Text>
                        </Col>
                    </Row>
                </Card>
            </Col>
            <Col span={24}>
                <Card bodyStyle={{ padding: '32 8' }} style={{ boxShadow: cssCardBoxShadow }}>
                    <Row>
                        <Col span={24}>
                            <Typography.Text>📷 Photos</Typography.Text>
                        </Col>
                        {data?.images?.map((item, index) => {
                            return (
                                <Col key={index}>
                                    <Image preview={false} src={item} alt="" fallback={fallbackImg} />
                                </Col>
                            );
                        })}
                    </Row>
                </Card>
            </Col>
        </Row>
    );
};

export default DetailDescription;
