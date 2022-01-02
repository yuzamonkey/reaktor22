import MenuButton from "./MenuButton"
import axios from 'axios'

const Search = ({ show, setShow }) => {
    
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const url = "http://localhost:3001/api/history"
    //         const result = await axios.get(url)
    //         console.log(result.data);
    //     };
    //     fetchData();
    
    // }, []);

    const handleInputChange = (value) => {
        console.log(value)
    }

    return (
        <div className={show ? "search-component-container visible" : "search-component-container hidden"}>
            <MenuButton handleClick={() => setShow(false)} icon="x" />
            <input className="search-input" type="text" onChange={e => handleInputChange(e.target.value)} />
        </div>
    )
}

export default Search