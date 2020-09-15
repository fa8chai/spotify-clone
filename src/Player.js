import React from 'react';
import './Player.css';
import Sidebar from './Sidebar';
import Body from './Body';
import Footer from './Footer';
import { useDispatch, useSelector } from 'react-redux';

function Player() {
    const dispatch = useDispatch();
    const spotify = useSelector(state => state.spotify);

    return (
        <div className='player'>
            <div className='player__body'>
                <Sidebar />
                <Body />
            </div>
            
            <Footer />
        </div>
    )
}

export default Player
