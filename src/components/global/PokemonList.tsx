import HomeContext from "@/context/home/HomeContext"
import { useContext } from "react"
import { PokemonType } from 'app-types'
import { Row, Col, Image, Empty } from 'antd'
import fallbackImg from "@/assets/img/fallbackImg"
import { useRouter } from 'next/router'

type PokemonItemType = {
    data: PokemonType
}

const PokemonItem = ({ data }: PokemonItemType) => {
    const router = useRouter()

    const onClick = () => {
        router.push(`/detail/${data?.id}`)
    }

    return (
        <Row onClick={onClick}>
            <Col span={12}>
                <Row justify={"end"}>
                    <Col>
                        <Image preview={false} alt={fallbackImg} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data?.id}.png`} />
                    </Col>
                </Row>
            </Col>
            <Col span={12}>
                <Row>
                    <Col span={24}>
                        {data?.name}
                    </Col>
                    <Col span={24}>
                        {data?.type?.toString()}
                    </Col>
                    <Col span={24}>
                        {data?.ability?.toString()}
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}


type PokemonsListProps = {
    pokemons: PokemonType[]
}

const PokemonsList = ({ pokemons }: PokemonsListProps) => {
    return (
        <Row>
            {pokemons?.map((item: any) => {
                return (
                    <Col key={item.id} span={24}>
                        <PokemonItem
                            data={item} />
                    </Col>
                )
            })}
        </Row>
    )
}

export default PokemonsList