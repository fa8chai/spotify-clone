import React from 'react';
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar } from '@material-ui/core';
import {logout, setAudio, setLogout, setPlay, setToken, updateShuffle } from './reduxConfig/actions';


function Header() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const token = useSelector(state => state.token);
    const showLogout = useSelector(state => state.showLogout);
    const audio = useSelector(state => state.audio);

    
    const Logout = () => {
        dispatch(setLogout(!showLogout));
    }

    const logUserOut = () => {
        if(audio){
            audio.pause();
        }
        dispatch(logout());
    }

    return (
        <div className='header'>
            <div className='header__left'>
                <SearchIcon />
                <input
                    placeholder='Search for Artists, Songs, or Podcasts'
                />
            </div>
            <div className='header__right' onClick={() => Logout()}>
                <Avatar src={user?.images[0]?.url} alt={user?.display_name} />
                <h4>{user?.display_name}</h4>
            </div>
            {
                showLogout &&
                <div className='header__logout'>
                    <p onClick={() => logUserOut()}>Logout</p>
                </div>     
            }
        </div>
    )
}

export default Header
