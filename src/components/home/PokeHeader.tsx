import HomeContext, { initialState, SORT_TYPE } from "@/context/home/HomeContext";
import { TYPE } from "@/context/home/HomeReducer";
import { Col, Input, Radio, RadioChangeEvent, Row, Select, Space } from "antd";
import { PokemonTypeType } from "app-types";
import { useContext } from "react";
import { useDebounce } from "@/helper/useDebounce";

const options = [
    {
        label: "Ascending",
        value: SORT_TYPE.ASCENDING
    },
    {
        label: "Descending",
        value: SORT_TYPE.DESCENDING
    }

]

const PokeHeader = () => {
    const { state, dispatcher } = useContext(HomeContext)

    const { pokemonType } = state;

    const onChangeSearch = (e: any) => {
        dispatcher({
            type: TYPE.CHANGE_SEARCH,
            payload: e.target.value
        })
    }

    const onChangeSearchDebounced = useDebounce(onChangeSearch);

    const onChangeSort = ({ target: { value } }: RadioChangeEvent) => {
        dispatcher({
            type: TYPE.CHANGE_SORT,
            payload: value
        })
    };

    const onChangeType = (value: string[]) => {
        dispatcher({
            type: TYPE.CHANGE_TYPE,
            payload: value
        })
    };

    return (
        <Row gutter={[16, 16]}>
            <Col span={12}>
                <Input onChange={onChangeSearchDebounced} />
            </Col>
            <Col span={6}>
                <Radio.Group
                    options={options}
                    onChange={onChangeSort}
                    optionType="button"
                    buttonStyle="solid"
                    defaultValue={initialState.sort}
                />
            </Col>
            <Col span={6}>
                <Select
                    mode="multiple"
                    style={{ width: 300 }}
                    placeholder="Select one or multiple"
                    onChange={onChangeType}
                    optionLabelProp="label"
                >
                    {pokemonType?.data?.map((item: PokemonTypeType) => {
                        return (
                            <Select.Option key={item?.id} value={item?.name} label={item?.name}>
                                <Space>
                                    <span role="img" aria-label="China">
                                        ⚔
                                    </span>
                                    {item?.name}
                                </Space>
                            </Select.Option>
                        )
                    })}
                </Select>
            </Col>
        </Row>
    )
}

export default PokeHeader;