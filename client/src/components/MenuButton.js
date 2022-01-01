const MenuButton = ({ handleClick, text }) => {
    return (
        <div
            className="show menu-button"
            onClick={() => handleClick()}>
            {text}
        </div>
    )
}


export default MenuButton