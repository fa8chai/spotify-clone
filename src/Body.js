import React, { useEffect } from 'react';
import './Body.css';
import Header from './Header';
import { useSelector, useDispatch } from 'react-redux';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import SongRow from './SongRow';
import { setAudio, setPlay, setTrack, updateShuffle } from './reduxConfig/actions';
import { getAudio } from './functions';


function Body() {
    const dispatch = useDispatch();
    const current_playlist = useSelector(state => state.current_playlist);
    const user = useSelector(state => state.user);
    const tracks = useSelector(state => state.tracks);
    const track = useSelector(state => state.track);
    const playing = useSelector(state => state.playing);
    const shuffle = useSelector(state => state.shuffle);
    const audio = useSelector(state => state.audio);
    
    const shuffleSongs = () => {
        if(!playing){
            //start playing
            let _audio = new Audio(track.preview_url);
            if(track.preview_url == null){
                alert('Audio is Not Provided!');
            }else{
            _audio.play();
            _audio.muted = false;
            dispatch(setPlay(true));
            dispatch(setAudio(_audio));
            dispatch(updateShuffle(true));
            }
        }else{
            audio.pause();
            dispatch(setAudio(null));
            dispatch(setPlay(false));
            dispatch(updateShuffle(false));
        }
    }
    useEffect(() => {
        if(audio && shuffle ){
            audio.onended = () => {
                let item = getAudio(tracks.items);
                while( item.track.preview_url == null ){
                    item = getAudio(tracks.items);
                }
                dispatch(setTrack(item.track))
                let _audio = new Audio(item.track.preview_url);
                _audio.play();
                _audio.muted = false;
                dispatch(setPlay(true));
                dispatch(setAudio(_audio));
            }
    }
    }, [audio, playing, shuffle])

    return (
        <div className='body'>
            <Header />
            <div className='body__info'>
                <img
                    src={current_playlist ? current_playlist?.images ? current_playlist?.images[0].url : 'https://cdn.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_250/https://www.hypebot.com/wp-content/uploads/2020/07/discover-weekly-250x250.png' : 'https://cdn.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_250/https://www.hypebot.com/wp-content/uploads/2020/07/discover-weekly-250x250.png'}
                    alt=''
                />
                <div className='body__infoText'>
                    <strong>PLAYLIST</strong>
                    <h1>{current_playlist?.name}</h1>
                    <p>{current_playlist?.description}</p>
                </div>
            </div>
            <div className='body__songs'>
                <div className='body__icons'>
                    {
                    shuffle && playing ?
                    <PauseCircleFilledIcon onClick={() => shuffleSongs()} className='body__shuffle'/>
                    :
                    <PlayCircleFilledIcon onClick={() => shuffleSongs()} className='body__shuffle' />
                    }
                    <FavoriteIcon fontSize='large' />
                    <MoreHorizIcon />
                </div>
                <div className='body__table'>
                    <p className='body__songTitle'>TITLE</p>
                    <p className='body__album'>ALBUM</p>
                    <p className='body__duration'><AccessTimeIcon fontSize='small' /></p>
                </div>
                <hr className='body__hr' />
                {tracks?.items?.map(item => (
                    <SongRow track={item.track} key={item.track.id}/>
                ))}
            </div>
        </div>
    )
}

export default Body
