import { Col, Row } from "antd"
import { useRouter } from "next/router"
import { ReactElement, ReactNode } from "react"

type ActiveLinkProps = {
    children: string,
    href: string
}

function ActiveLink({ children, href }: ActiveLinkProps): ReactElement {
    const router = useRouter()
    const style = {
        marginRight: 10,
        color: router.asPath === href ? 'red' : 'black',
    }

    const handleClick = (e: any) => {
        e.preventDefault()
        router.push(href)
    }

    return (
        <a href={href} onClick={handleClick} style={style}>
            {children}
        </a>
    )
}


const PokeFooter = (): ReactElement => {
    return (
        <Row>
            <Col>
                <ActiveLink href='/'>
                    Home
                </ActiveLink>
                <ActiveLink href='/profile'>
                    Profile
                </ActiveLink>
            </Col>
        </Row>
    )
}

export default PokeFooter