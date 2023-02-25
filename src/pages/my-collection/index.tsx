import PokemonsList from "@/components/global/PokemonList"
import PokeFooter from "@/components/home/PokeFooter"
import { Col, Row } from "antd"
import { PokemonType } from "app-types"
import { pokemonsTable } from "database.config"
import { useEffect, useState } from "react"

const MyCollection = () => {
    const [pokemons, setPokemons] = useState<PokemonType[]>([])

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
        <Row>
            <Col span={24}>
                <PokemonsList pokemons={pokemons} />
            </Col>
            <Col span={24}>
                <PokeFooter />
            </Col>
        </Row>
    )
}

export default MyCollection