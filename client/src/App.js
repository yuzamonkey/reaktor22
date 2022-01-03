import { useState } from "react";
import Navbar from "./components/Utility/Navbar";
import Live from "./components/Live/Live";
import Search from "./components/Search/Search";

const App = () => {
    const [show, setShow] = useState(false)
    return (
        <div className="main-container">
            <Navbar showSearch={() => setShow(true)} />
            <Live />
            <Search show={show} setShow={setShow} />
        </div>
    );
}

export default App;
