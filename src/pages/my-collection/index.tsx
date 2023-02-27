import PokeFooter from "@/components/home/PokeFooter"
import MyCollectionSection from "@/components/my-collection/MyCollectionSection"
import Profile from "@/components/my-collection/Profile"
import { Col, Row } from "antd"

const MyCollection = () => {
    return (
        <Row gutter={[0, 32]}>
            <Col span={24}>
                <Profile />
            </Col>
            <Col span={24}>
                <MyCollectionSection />
            </Col>
            <Col span={24}>
                <PokeFooter />
            </Col>
        </Row>
    )
}

export default MyCollection