import React from 'react'
import MenuButton from './MenuButton'
import Title from './Title'

const Navbar = ({ showSearch }) => {
    return (
        <div className='title-and-menu-button'>
            <div className='info-text'>
                <p>Reaktor -22</p>
                <a href='https://github.com/yuzamonkey/reaktor22' target='_blank' rel='noreferrer'>Source code</a>
            </div>
            <Title />
            <MenuButton handleClick={showSearch} icon='☰' />
        </div>
    )
}

export default Navbar