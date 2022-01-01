import { useState } from "react"
import MenuButton from "./MenuButton"

const Search = ({ setShow }) => {
    return (
        <div>
            <MenuButton handleClick={() => setShow(false)} text="x" />
            Search component

        </div>
    )
}

export default Search