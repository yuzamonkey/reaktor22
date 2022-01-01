import { useState } from "react";
import Live from "./components/Live";
import Search from "./components/Search";
import MenuButton from "./components/MenuButton";

const App = () => {
    const [show, setShow] = useState(false)
    return (
        <div className="main-container">
            <h1 className="title">Rock-Paper-Scissors</h1>
            <MenuButton handleClick={() => setShow(true)} text="☰" />
            <div className="live-component-container">
                <Live />
            </div>
            <div className={show ? "search-component-container visible" : "search-component-container hidden"}>
                <Search setShow={setShow} />
            </div>
        </div>
    );
}

export default App;
