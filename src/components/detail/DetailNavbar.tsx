import { cssNavbarBoxShadow } from '@/helper/constants';
import { LeftOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row, Typography } from 'antd';
import { useRouter } from 'next/router';

const DetailNavbar = () => {
    const router = useRouter();

    const onClick = () => {
        router.back();
    };

    return (
        <Card
            bodyStyle={{ padding: 4 }}
            style={{
                background: 'white',
                boxShadow: cssNavbarBoxShadow,
            }}
        >
            <Row gutter={[25, 0]}>
                <Col xs={8} sm={8} md={8} lg={4} xl={4}>
                    <Button onClick={onClick} block icon={<LeftOutlined />}>
                        Back
                    </Button>
                </Col>
                <Col span={16}>
                    <Typography.Text style={{ fontSize: 18 }}>Pokemon detail</Typography.Text>
                </Col>
            </Row>
        </Card>
    );
};

export default DetailNavbar;
