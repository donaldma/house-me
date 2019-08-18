import React from 'react'
import './AboutButton.scss'
import { Link } from 'react-router-dom';

function AboutButton() {
    return (
        <div id='aboutButton'>
            <Link to='/about'>
                <button className='selectionButton'>We'd like to chat</button>
            </Link>
        </div>
    )
}

export default AboutButton