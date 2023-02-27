import { Col, Row } from "antd"
import { useRouter } from "next/router"
import { ReactElement, ReactNode, useMemo } from "react"
import { Segmented } from 'antd'
import { HomeOutlined, FolderOpenOutlined } from '@ant-design/icons'

const PokeFooter = (): ReactElement => {
    const router = useRouter()
    const currentPath = router.asPath

    const value = useMemo(() => {
        if (currentPath === '/') {
            return 'home'
        } else {
            return 'my-collection'
        }
    }, [currentPath])

    const onChange = (value: string | number) => {
        if (value === 'home') {
            router.push('/')
        } else {
            router.push(`/${value}`)
        }
    }

    return (
        <Row>
            <Col span={24}>
                <Segmented
                    value={value}
                    onChange={onChange}
                    block
                    options={[{
                        label: (
                            <Row>
                                <Col span={24}>
                                    <HomeOutlined />
                                </Col>
                                <Col span={24}>
                                    Home
                                </Col>
                            </Row>
                        ),
                        value: 'home'
                    },
                    {
                        label: (
                            <Row>
                                <Col span={24}>
                                    <FolderOpenOutlined />
                                </Col>
                                <Col span={24}>
                                    My Collection
                                </Col>
                            </Row>
                        ),
                        value: 'my-collection'
                    }]} />
            </Col>
        </Row>
    )
}

export default PokeFooter