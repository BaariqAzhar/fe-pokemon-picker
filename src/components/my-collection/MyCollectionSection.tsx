import useWindowSize from "@/helper/useWindowSize";
import { Col, Row, Typography } from "antd";
import { PokemonType } from "app-types";
import { pokemonsTable } from "database.config";
import { useEffect, useState } from "react";
import styled from "styled-components";
import PokemonsList from "../global/PokemonList";

const MyCollectionSection = () => {
    const [pokemons, setPokemons] = useState<PokemonType[]>([])

    const size = useWindowSize()

    const heightContent = size.height - (140 + 120 + (18 * 2))
    const ContentWrapper = styled.div`
        height: ${heightContent}px;
        overflow-y: auto;
        overflow-x: hidden;
    `

    const getMyPokemons = async () => {
        const res: any = await pokemonsTable.toArray();
        const pokemons: PokemonType[] = res?.map((item: any) => {
            return {
                ...item,
                type: JSON.parse(item?.type),
                ability: JSON.parse(item?.ability),
                images: JSON.parse(item?.images),
                stats: JSON.parse(item?.stats),
            }
        })
        setPokemons(pokemons)
    }

    useEffect(() => {
        getMyPokemons()
    }, [])

    return (
        <Row gutter={[0, 18]}>
            <Col>
                <Typography.Text style={{ fontSize: 20 }}>
                    🎒  My Collection
                </Typography.Text>
            </Col>
            <Col span={24}>
                <ContentWrapper>
                    <PokemonsList pokemons={pokemons} />
                </ContentWrapper>
            </Col>
        </Row>
    )
}

export default MyCollectionSection