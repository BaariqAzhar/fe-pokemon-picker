import fallbackImg from "@/assets/img/fallbackImg"
import { IMAGE_URL_POKE } from "@/helper/constants"
import { Col, Image, Row, Typography } from "antd"
import { PokemonType } from "app-types"

type DetailDescriptionProps = {
    data: PokemonType
}

const DetailDescription = ({ data }: DetailDescriptionProps) => {
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