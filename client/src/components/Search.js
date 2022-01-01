import MenuButton from "./MenuButton"

const Search = ({ show, setShow }) => {
    return (
        <div className={show ? "search-component-container visible" : "search-component-container hidden"}>
            <MenuButton handleClick={() => setShow(false)} icon="x" />
            Search component
        </div>
    )
}

export default Search