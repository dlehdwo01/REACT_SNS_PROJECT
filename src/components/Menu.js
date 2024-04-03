import React from 'react';
import './Menu.css';
const Menu = (props) => {
    return (
        <div>
            <div className='menu'>
                <div className='menu-title'>
                    {props.title}
                </div>
                <div className='menu-content'>
                    {props.content}
                </div>
            </div>

        </div>
    );
}
export default Menu;