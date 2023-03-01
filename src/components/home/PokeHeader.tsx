import PokeballLogo from '@/assets/img/pokeball-logo.png';
import HomeContext, { initialState, SORT_TYPE } from '@/context/home/HomeContext';
import { TYPE } from '@/context/home/HomeReducer';
import { cssNavbarBoxShadow } from '@/helper/constants';
import { useDebounce } from '@/helper/useDebounce';
import { MenuOutlined } from '@ant-design/icons';
import { Button, Card, Col, Input, Modal, Radio, RadioChangeEvent, Row, Select, Space, Typography } from 'antd';
import { PokemonTypeType } from 'app-types';
import Image from 'next/image';
import { useContext, useState } from 'react';

const options = [
    {
        label: 'Ascending',
        value: SORT_TYPE.ASCENDING,
    },
    {
        label: 'Descending',
        value: SORT_TYPE.DESCENDING,
    },
];

const SearchPokemon = () => {
    const { dispatcher } = useContext(HomeContext);

    const onChangeSearch = (e: any) => {
        dispatcher({
            type: TYPE.CHANGE_SEARCH,
            payload: e.target.value,
        });
    };

    const onChangeSearchDebounced = useDebounce(onChangeSearch);

    return <Input placeholder="Search name or id pokemon ..." onChange={onChangeSearchDebounced} />;
};

const SortPokemon = () => {
    const { dispatcher } = useContext(HomeContext);

    const onChangeSort = ({ target: { value } }: RadioChangeEvent) => {
        dispatcher({
            type: TYPE.CHANGE_SORT,
            payload: value,
        });
    };

    return (
        <Row gutter={[0, 8]}>
            <Col span={24}>
                <Typography.Text>Sort by pokemon name</Typography.Text>
            </Col>
            <Col span={24}>
                <Radio.Group options={options} onChange={onChangeSort} optionType="button" buttonStyle="solid" defaultValue={initialState.sort} />
            </Col>
        </Row>
    );
};

const FilterTypePokemon = () => {
    const { state, dispatcher } = useContext(HomeContext);
    const { pokemonType } = state;

    const onChangeType = (value: string[]) => {
        dispatcher({
            type: TYPE.CHANGE_TYPE,
            payload: value,
        });
    };

    return (
        <Row gutter={[0, 8]}>
            <Col span={24}>
                <Typography.Text>Filter based by pokemon type</Typography.Text>
            </Col>
            <Col span={24}>
                <Select mode="multiple" style={{ width: 300 }} placeholder="Select one or multiple" onChange={onChangeType} optionLabelProp="label">
                    {pokemonType?.data?.map((item: PokemonTypeType) => {
                        return (
                            <Select.Option key={item?.id} value={item?.name} label={item?.name}>
                                <Space>{item?.name}</Space>
                            </Select.Option>
                        );
                    })}
                </Select>
            </Col>
        </Row>
    );
};

type SortFilterModalForMobileProps = {
    open: boolean;
    handleIsModalOpen: () => void;
};

const SortFilterModalForMobile = ({ open, handleIsModalOpen }: SortFilterModalForMobileProps) => {
    return (
        <div id="sort_filter_modal">
            <Modal title="Sort & Filter Type" open={open} onCancel={handleIsModalOpen} footer={null}>
                <Row style={{ marginTop: 30 }} gutter={[0, 20]}>
                    <Col>
                        <SortPokemon />
                    </Col>
                    <Col>
                        <FilterTypePokemon />
                    </Col>
                </Row>
            </Modal>
        </div>
    );
};

const PokeHeader = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleIsModalOpen = () => {
        setIsModalOpen((prev) => !prev);
    };

    return (
        <div id='home_navbar'>
            <Card bodyStyle={{ padding: 4 }} style={{ background: 'white', boxShadow: cssNavbarBoxShadow }}>
                <Row align={'middle'}>
                    <Col flex="40px">
                        <Image src={PokeballLogo} alt="" style={{ maxWidth: '33px', height: 'auto' }} />
                    </Col>
                    <Col flex="auto">
                        <SearchPokemon />
                    </Col>
                    <Col flex="50px">
                        <Row justify="center">
                            <Col>
                                <Button id='sort_filter_button' icon={<MenuOutlined />} onClick={handleIsModalOpen} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>

            <SortFilterModalForMobile open={isModalOpen} handleIsModalOpen={handleIsModalOpen} />
        </div>
    );
};

export default PokeHeader;
