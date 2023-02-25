import fallbackImg from "@/assets/img/fallbackImg"
import { IMAGE_URL_POKE } from "@/helper/constants"
import { Button, Col, Image, Row, Typography } from "antd"
import { PokemonType } from "app-types"
import { pokemonsTable } from "database.config"
import { useEffect, useState } from "react"

const useIsCaught = (id: number) => {
    const [isCaught, setIsCaught] = useState(false)

    const checkIsCaught = async () => {
        const res = await pokemonsTable.where('id').equals(id).toArray();
        if (res.length > 0) {
            setIsCaught(true)
        } else {
            setIsCaught(false)
        }
    }

    useEffect(() => {
        checkIsCaught();
    }, [id])

    return { isCaught, checkIsCaught }
}

type DetailDescriptionProps = {
    data: PokemonType
}

const DetailDescription = ({ data }: DetailDescriptionProps) => {
    const { isCaught, checkIsCaught } = useIsCaught(data?.id || 0)

    const onClickCatch = async (event: any) => {
        const pokemon = {
            ...data,
            type: JSON.stringify(data?.type),
            ability: JSON.stringify(data?.ability),
            images: JSON.stringify(data?.images),
            stats: JSON.stringify(data?.stats),
        }
        try {
            const id = await pokemonsTable.add(pokemon);
            console.info(`A new customer was created with id ${id}`);
        } catch (error) {
            console.error(`Failed to add ${pokemon}: ${error}`);
        } finally {
            checkIsCaught()
        }
    }

    const onClickRelease = async (event: any) => {
        try {
            await pokemonsTable.delete(data?.id || 0);
            console.info(`Pokemon with id ${data?.id} is released`);
        } catch (error) {
            console.error(`Failed to release pokemon with id ${data?.id}: ${error}`);
        } finally {
            checkIsCaught()
        }
    }

    return (
        <Row>
            <Col span={24}>
                <Row>
                    <Col span={14}>
                        <Image preview={false} alt={fallbackImg} src={`${IMAGE_URL_POKE}${data?.id}.png`} />
                    </Col>
                    <Col>
                        <Row>
                            <Col span={24}>
                                <Typography.Text>{data?.name}</Typography.Text>
                            </Col>
                            <Col span={24}>
                                <Typography.Text>Species : {data?.name}</Typography.Text>
                            </Col>
                            <Col span={24}>
                                <Typography.Text>Type : {data?.type?.toString()}</Typography.Text>
                            </Col>
                            <Col span={24}>
                                <Typography.Text>Ability : {data?.ability?.toString()}</Typography.Text>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                {isCaught ? (<Button onClick={onClickRelease}>Release the pokemon</Button>) : (<Button onClick={onClickCatch}>Catch the pokemon</Button>)}
            </Col>
            <Col span={24}>
                <Row>
                    <Col span={24}>
                        <Typography.Text>Species : {data?.name}</Typography.Text>
                    </Col>
                    <Col span={24}>
                        <Row>

                            {data?.stats?.map((item, index) => {
                                return (
                                    <Col key={index} span={12}>
                                        <Typography.Text >{item?.name} : {item?.point}</Typography.Text>
                                    </Col>
                                )
                            })}
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Typography.Text>Weight : {data?.weight} Kg</Typography.Text>
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row>
                    {data?.images?.map((item, index) => {
                        return (
                            <Col key={index}>
                                <Image preview={false} src={item} alt="" fallback={fallbackImg} />
                            </Col>
                        )
                    })}
                </Row>
            </Col>
        </Row>
    )
}

export default DetailDescription