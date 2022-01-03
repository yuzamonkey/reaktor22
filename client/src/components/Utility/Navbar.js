import MenuButton from "./MenuButton"
import Title from "./Title"

const Navbar = ({ showSearch }) => {
    return (
        <div className="title-and-menu-button">
            <p>Reaktor -22</p>
            <Title />
            <MenuButton handleClick={showSearch} icon="☰" />
        </div>
    )
}

export default Navbar