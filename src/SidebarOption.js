import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPlaylist, setTracks } from './reduxConfig/actions';
import './SidebarOption.css';

function SidebarOption({ option, Icon, id }) {
    const dispatch = useDispatch();
    const playlist = useSelector(state => state.current_playlist);
    const playlists = useSelector(state => state.playlists);
    const spotify = useSelector(state => state.spotify);

    const changePlaylist = (id, e) => {
        dispatch(setCurrentPlaylist(id))
    }
    useEffect(() => {
        spotify.getPlaylistTracks(playlist?.id).then(res => {
            dispatch(setTracks(res))
        })
    }, [playlist])

    return (
        <div className='sidebarOption'>
            {Icon && <Icon className='sidebarOption__icon' />}
            {Icon ? <h4>{option}</h4> : <p onClick={(e) => changePlaylist(id, e)}>{option}</p>}
        </div>
    )
}

export default SidebarOption
