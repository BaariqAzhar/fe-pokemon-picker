import PokeballLogo from '@/assets/img/pokeball-logo.png'
import ProfOak from "@/assets/img/prof-oak.png"
import CatchPokemon from '@/assets/img/tutorials/catch.png'
import DetailPage from '@/assets/img/tutorials/detail.png'
import Gotodetails from '@/assets/img/tutorials/go-to-details.png'
import IsCaught from '@/assets/img/tutorials/is-caught.png'
import SelectAvatarsImg from '@/assets/img/tutorials/select-avatar.png'
import { Col, Modal, Pagination, Row, Typography } from "antd"
import Image from "next/image"
import { useState } from "react"

const PageWelcome = () => {
    return (
        <>
            <Row justify="center">
                <Col>
                    <Image src={ProfOak} alt="" style={{ width: 180, height: 'auto' }} />
                </Col>
            </Row>
            <div style={{ marginTop: 32 }}>
                <Typography.Text >
                    Hi Pokemon trainer! Welcome to the world of Pokemon! Get ready to explore a variety of Pokemon, and catch them. Be the best and achieve the glory of becoming a Pokemon Master!
                </Typography.Text>
            </div>
        </>
    )
}

const PageFeatures = () => {
    return (
        <>
            <Row justify="center">
                <Col>
                    <Image src={PokeballLogo} alt="" style={{ width: 100, height: 'auto' }} />
                </Col>
            </Row>
            <div style={{ marginTop: 32 }}>
                <Typography.Text >
                    In this application “Pokemon Picker” have some features, such as
                    <ul>
                        <li>Search, sort & filter pokemon</li>
                        <li>View detail of pokemon (ability, stats, etc)</li>
                        <li>Catch pokemon</li>
                        <li>List caught pokemon</li>
                        <li>Release pokemon</li>
                        <li>Select avatar</li>
                    </ul>
                </Typography.Text>
            </div>
        </>
    )
}

const PageGoDetail = () => {
    return (
        <>
            <Typography.Text style={{ fontSize: 18 }}>
                View detail of pokemon
            </Typography.Text>
            <br /><br />
            <Row justify="center">
                <Col>
                    <Image style={{ width: "100%", height: 'auto' }} src={Gotodetails} alt="" />
                </Col>
            </Row>
            <br /><br />
            <Typography.Text>
                In Home page &#8220;/&#8221;, click &#8220;Detail&#8221;
            </Typography.Text>
            <br /><br />
            <Row justify="center">
                <Col>
                    <Image style={{ width: "100%", height: 'auto' }} src={DetailPage} alt="" />
                </Col>
            </Row>
        </>
    )
}

const PageCatch = () => {
    return (
        <>
            <Typography.Text style={{ fontSize: 18 }}>
                Catch pokemon
            </Typography.Text>
            <br /><br />
            <Row justify="center">
                <Col>
                    <Image style={{ width: "100%", height: 'auto' }} src={CatchPokemon} alt="" />
                </Col>
            </Row>
            <Typography.Text>
                In Detail page &#8220;/detail/?id&#8221;, click &#8220;Catch the pokemon&#8221;
            </Typography.Text>
            <br /><br />
            <Row justify="center">
                <Col>
                    <Image style={{ width: "100%", height: 'auto' }} src={IsCaught} alt="" />
                </Col>
            </Row>
            <Typography.Text>
                Pokeball icon has change from monochrome to red-white
            </Typography.Text>
        </>
    )
}

const PageAvatar = () => {
    return (
        <>
            <Typography.Text style={{ fontSize: 18 }}>
                Select your avatar
            </Typography.Text>
            <br /><br />
            <Row justify="center">
                <Col>
                    <Image style={{ width: "100%", height: 'auto' }} src={SelectAvatarsImg} alt="" />
                </Col>
            </Row>
            <Typography.Text>
                Click edit icon and it will show form select avatar
            </Typography.Text>
        </>
    )
}


type PageType = {
    id: number,
    page: any
}

const pages: PageType[] = [
    {
        id: 1,
        page: <PageWelcome />
    },
    {
        id: 2,
        page: <PageFeatures />
    },
    {
        id: 3,
        page: <PageGoDetail />
    },
    {
        id: 4,
        page: <PageCatch />
    },
    {
        id: 5,
        page: <PageAvatar />
    }
]

type RenderPageProps = {
    pageNumber: number
}

const RenderPage = ({ pageNumber }: RenderPageProps) => {
    return pages.find((item) => item.id === pageNumber)?.page || <>masuk sini</>;
}

type TutorialsModalProps = {
    showTutorials: boolean,
    handleShowTutorials: () => void
}

const TutorialsModal = ({ showTutorials, handleShowTutorials }: TutorialsModalProps) => {
    const [pageNumber, setPageNumber] = useState(1)

    const onChange = (page: number, pageSize: number) => {
        console.log('page, pageSize', page, pageSize);
        setPageNumber(page)
    }

    return (
        <Modal title="Tutorials"
            open={showTutorials}
            onCancel={handleShowTutorials}
            footer={null}
        >
            <Row style={{ minHeight: 500, marginTop: 32 }}>
                <Col span={24} style={{ minHeight: 480 }}>
                    {pages.find((item) => item.id === pageNumber)?.page || <> Sorry 🙏, Something Error</>}
                </Col>
            </Row>
            <Col span={24}>
                <Row justify="center">
                    <Col>
                        <Pagination onChange={onChange} simple defaultCurrent={1} total={50} />
                    </Col>
                </Row>
            </Col>
        </Modal>
    )
}

export default TutorialsModal