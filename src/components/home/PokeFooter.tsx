import useWindowSize from '@/helper/useWindowSize';
import { FolderOpenOutlined, HomeOutlined } from '@ant-design/icons';
import { Col, Row, Segmented } from 'antd';
import { useRouter } from 'next/router';
import { ReactElement, useMemo } from 'react';
import styled from 'styled-components';

const PokeFooter = (): ReactElement => {
    const windowSize = useWindowSize();
    const router = useRouter();
    const currentPath = router.asPath;

    const value = useMemo(() => {
        if (currentPath === '/') {
            return 'home';
        } else {
            return 'my-collection';
        }
    }, [currentPath]);

    const onChange = (value: string | number) => {
        if (value === 'home') {
            router.push('/');
        } else {
            router.push(`/${value}`);
        }
    };

    const NavbarWrapper = styled.div`
        position: fixed;
        bottom: 4px;
        width: ${windowSize.width >= 800 ? '800px' : '96vw'};
    `;

    return (
        <NavbarWrapper>
            <Segmented
                value={value}
                onChange={onChange}
                block
                options={[
                    {
                        label: (
                            <Row>
                                <Col span={24}>
                                    <HomeOutlined />
                                </Col>
                                <Col span={24}>Home</Col>
                            </Row>
                        ),
                        value: 'home',
                    },
                    {
                        label: (
                            <Row>
                                <Col span={24}>
                                    <FolderOpenOutlined />
                                </Col>
                                <Col span={24}>My Collection</Col>
                            </Row>
                        ),
                        value: 'my-collection',
                    },
                ]}
            />
        </NavbarWrapper>
    );
};

export default PokeFooter;
