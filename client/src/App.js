import { useState } from "react";
import Title from "./components/Utility/Title";
import MenuButton from "./components/Utility/MenuButton";
import Live from "./components/Live/Live";
import Search from "./components/Search/Search";

const App = () => {
    const [show, setShow] = useState(false)
    return (
        <div className="main-container">
            <div className="title-and-menu-button">
                <p>Reaktor -22</p>
                <Title />
                <MenuButton handleClick={() => setShow(true)} icon="☰" />
            </div>
            <Live />
            <Search show={show} setShow={setShow} />
        </div>
    );
}

export default App;
