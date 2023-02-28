import avatars from '@/assets/data/avatars';
import { cssNavbarBoxShadow } from '@/helper/constants';
import { EditOutlined, EllipsisOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Button, Card, Col, Dropdown, MenuProps, message, Modal, Row, Segmented, Typography } from 'antd';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import CreditsModal from './CreditsModal';
import TutorialsModal from './TutorialsModal';

type SelectAvatarImageProps = {
    avatar: number | string | undefined;
    setAvatar: (arg: number | string) => void;
};

const SelectAvatarImage = ({ avatar, setAvatar }: SelectAvatarImageProps) => {
    const onChange = (value: number | string) => {
        setAvatar(value);
    };

    return (
        <Segmented
            value={avatar}
            onChange={onChange}
            options={avatars.map((item) => {
                return {
                    label: (
                        <Row>
                            <Col span={24}>
                                <Image
                                    src={item.photo}
                                    alt=""
                                    style={{ width: 80, height: 'auto', borderStyle: 'solid', borderColor: 'black', borderRadius: '100%' }}
                                />
                            </Col>
                            <Col span={24}>
                                <Typography.Text>{item.name}</Typography.Text>
                            </Col>
                        </Row>
                    ),
                    value: item.id,
                };
            })}
        />
    );
};

type EditModalProps = {
    showEditModal: boolean;
    setShowModal: (arg: boolean) => void;
    avatar: number | string | undefined;
    setAvatar: (arg: number | string) => void;
};

const EditModal = ({ showEditModal, setShowModal, avatar, setAvatar }: EditModalProps) => {
    const onCancel = () => {
        setShowModal(false);
    };

    return (
        <Modal title="Select avatar" open={showEditModal} footer={null} onCancel={onCancel}>
            <div style={{ marginTop: 30 }}>
                <SelectAvatarImage avatar={avatar} setAvatar={setAvatar} />
            </div>
        </Modal>
    );
};

type AvatarImageProps = {
    avatar: number | string | undefined;
    size: number;
};

const AvatarImage = ({ avatar, size = 50 }: AvatarImageProps) => {
    const src = avatars.find((item) => item.id === avatar)?.photo || '';

    if (typeof avatar === 'undefined') {
        return null;
    }

    return <Image src={src} alt="" style={{ width: size, height: 'auto', borderStyle: 'solid', borderColor: 'black', borderRadius: '100%' }} />;
};

const Profile = () => {
    const [showEditModal, setShowModal] = useState<boolean>(false);
    const [showCredits, setShowCredits] = useState<boolean>(false);
    const [showTutorials, setShowTutorials] = useState<boolean>(false);
    const [avatar, setAvatar] = useState<number | string | undefined>();

    const openEditModal = () => {
        setShowModal(true);
    };

    const handleShowCredits = () => {
        setShowCredits((prev: boolean) => !prev);
    };

    const handleShowTutorials = () => {
        setShowTutorials((prev: boolean) => !prev);
    };

    const items: MenuProps['items'] = [
        {
            key: 'TUTORIALS',
            icon: <InfoCircleOutlined />,
            label: 'Tutorials',
            onClick: handleShowTutorials,
        },
        {
            key: 'CREDITS',
            icon: <InfoCircleOutlined />,
            label: 'Credits',
            onClick: handleShowCredits,
        },
    ];

    useEffect(() => {
        if (localStorage.getItem('AVATAR_ID')) {
            const userAvatar = localStorage.getItem('AVATAR_ID');
            setAvatar(Number(userAvatar) || 0);
        }
    }, []);

    useEffect(() => {
        if (typeof avatar !== 'undefined') {
            localStorage.setItem('AVATAR_ID', JSON.stringify(avatar));
        }
    }, [avatar]);

    return (
        <>
            <Card bodyStyle={{ padding: '18px 8px' }} style={{ boxShadow: cssNavbarBoxShadow }}>
                <Row gutter={[8, 0]}>
                    <Col span={18}>
                        <Row gutter={20}>
                            <Col flex="58px">
                                <AvatarImage avatar={avatar} size={50} />
                            </Col>
                            <Col>
                                <Typography.Text style={{ fontSize: 30 }}>{avatars.find((item) => item.id === avatar)?.name}</Typography.Text>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={6}>
                        <Row justify="end" align="middle">
                            <Col>
                                <Button onClick={openEditModal} type="ghost" icon={<EditOutlined />} />
                            </Col>
                            <Col>
                                <Dropdown menu={{ items }} placement="bottomRight">
                                    <Button type="ghost" icon={<EllipsisOutlined />} />
                                </Dropdown>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>

            <EditModal {...{ showEditModal, setShowModal, avatar, setAvatar }} />
            <CreditsModal {...{ showCredits, handleShowCredits }} />
            <TutorialsModal {...{ showTutorials, handleShowTutorials }} />
        </>
    );
};

export default Profile;
