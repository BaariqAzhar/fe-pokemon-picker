import { Button, Card, Col, Row, Typography } from "antd"
import { PokemonType } from "app-types"
import { useRouter } from 'next/router'
import styled from "styled-components"
import { LeftOutlined } from '@ant-design/icons'
import { cssNavbarBoxShadow } from '@/helper/constants'


const DetailNavbar = () => {
    const router = useRouter()

    const onClick = () => {
        router.back()
    }

    return (
        <Card bodyStyle={{ padding: 4 }} style={{
            background: 'white',
            boxShadow: cssNavbarBoxShadow
        }}>
            <Row gutter={[25, 0]}>
                <Col span={6}>
                    <Button onClick={onClick} block icon={<LeftOutlined />}>
                        Back
                    </Button>
                </Col>
                <Col span={18}>
                    <Typography.Text style={{ fontSize: 18 }}>
                        Pokemon detail
                    </Typography.Text>
                </Col>
            </Row>
        </Card>
    )
}

export default DetailNavbar