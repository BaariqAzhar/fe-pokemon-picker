import { Button, Col, Row, Typography } from "antd"
import { PokemonType } from "app-types"
import { useRouter } from 'next/router'

type DetailNavbarProps = {
    data: PokemonType
}

const DetailNavbar = ({ data }: DetailNavbarProps) => {
    const router = useRouter()

    const onClick = () => {
        router.back()
    }

    return (
        <Row>
            <Col span={4}>
                <Button onClick={onClick}>
                    Back
                </Button>
            </Col>
            <Col span={12}>
                <Row>
                    <Col>
                        <Typography.Text >
                            {data.name}
                        </Typography.Text>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default DetailNavbar