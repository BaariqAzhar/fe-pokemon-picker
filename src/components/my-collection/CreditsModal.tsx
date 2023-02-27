import { Modal } from "antd"
import { GithubOutlined } from '@ant-design/icons'

type CreditsModalProps = {
    showCredits: boolean,
    handleShowCredits: () => void
}

const CreditsModal = ({ showCredits, handleShowCredits }: CreditsModalProps) => {
    // showCredits, setShowCredits

    return (
        <Modal
            title="Credits"
            open={showCredits}
            onCancel={handleShowCredits}
            footer={null}
        >
            <div style={{ marginTop: 30 }}>
                <GithubOutlined /> Github: <a href="https://github.com/BaariqAzhar/fe-pokemon-picker">BaariqAzhar/fe-pokemon-picker</a>
                <br /> <br />
                Source: <br />
                API <a href="https://pokeapi.co/">pokeapi.co</a> <br />
                <a href="https://pokemon.fandom.com/wiki/Pok%C3%A9mon_Wiki">pokemon.fandom.com</a> <br />
                <a href="https://myanimelist.net/anime/42161/Poketoon">myanimelist.net (Poketoon)</a>
            </div>
        </Modal>
    )
}

export default CreditsModal