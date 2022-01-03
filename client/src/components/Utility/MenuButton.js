const MenuButton = ({ handleClick, icon }) => {
    return (
        <div
            className="show menu-button"
            onClick={() => handleClick()}>
            {icon}
        </div>
    )
}


export default MenuButton