import React, { useEffect } from 'react';
import './Footer.css';
import { useDispatch, useSelector } from 'react-redux';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import RepeatIcon from '@material-ui/icons/Repeat';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import { Grid, Slider } from '@material-ui/core';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import { millisToMinutesAndSeconds, setPause, setPlay, setAudio, updateTime, updateRepeat, updateShuffle, setPrev, setNext, setTrack, setValue } from './reduxConfig/actions';
import TextTruncate from 'react-text-truncate';
import { getAudio } from './functions';


function Footer() {
    const dispatch = useDispatch();
    const spotify = useSelector(state => state.spotify);
    const track = useSelector(state => state.track);
    const tracks = useSelector(state => state.tracks);
    const current_time = useSelector(state => state.current_time);
    const playing = useSelector(state => state.playing);
    const audio = useSelector(state => state.audio);
    const repeat = useSelector(state => state.repeat);
    const shuffle = useSelector(state => state.shuffle);
    const value = useSelector(state => state.value);


    const changePlay = () => {
        if( !playing ) {
            let _audio = new Audio(track?.preview_url);
            if(track?.preview_url == null){
                alert('Audio is Not Provided!');
            }else{
            _audio.play();
            _audio.muted = false;
            dispatch(setPlay(true));
            dispatch(setAudio(_audio));
            }
        }else{
            audio.pause();
            dispatch(setAudio(null));
            dispatch(setPlay(false));
        }
    }

    const handleChange = (e, newValue) => {
        dispatch(setValue(newValue));
    }

    const handlePreChange = () => {
        if(audio){
            audio.pause();
        }
        dispatch(setPrev(track));
        dispatch(setAudio(null));
        dispatch(setPlay(false));
    }

    const handleNextChange = () => {
        if(audio){
            audio.pause();
        }
        dispatch(setNext(track));
        dispatch(setAudio(null));
        dispatch(setPlay(false));
    }

    useEffect(() => {
        if(audio){
            audio.addEventListener('timeupdate', e =>{
                dispatch(updateTime(e.target.currentTime*1000))
            });
            audio.volume = value / 100;
            if(repeat){
                audio.loop = true;
                dispatch(updateShuffle(false));
            }
            if(shuffle) {
                audio.onended = () => {
                    let item = getAudio(tracks.items);
                    while( item.track.preview_url == null ){
                        item = getAudio(tracks.items);
                    }
                    dispatch(setTrack(item.track))
                    console.log(item.track.name);
                    let _audio = new Audio(item.track.preview_url);
                    _audio.play();
                    _audio.muted = false;
                    dispatch(setPlay(true));
                    dispatch(setAudio(_audio));
                }
            }else{
                audio.onended = () => {
                    dispatch(setAudio(null));
                    dispatch(setPlay(false));
            }
                
            }}
    }, [audio, shuffle, repeat, value])

    return (
        <div className='footer'>
            <div className='footer__left'>
                <img 
                    className='footer__albumLogo'
                    src={track?.album.images[0].url}
                    alt=''
                />
                <div className='footer__songInfo'>
                <TextTruncate
                    line={1}
                    element='h4'
                    truncateText='...'
                    text={track?.name}
                />
                    <p>{track?.artists.map(artist => artist.name).join(', ')}</p>
                </div>

            </div>
            <div className='footer__center'>
                <p>{millisToMinutesAndSeconds(current_time)}</p>
                {
                    !shuffle ?
                    <ShuffleIcon onClick={() => dispatch(updateShuffle(true))} className='footer__icon' />
                    :
                    <ShuffleIcon onClick={() => dispatch(updateShuffle(false))} className='footer__icon footer__green' />
                }
                <SkipPreviousIcon onClick={() => handlePreChange()} className='footer__icon' />
                {
                    !playing ? 
                    <PlayCircleOutlineIcon onClick={() => changePlay()} className='footer__icon footer__icon--play' />
                    :
                    <PauseCircleOutlineIcon onClick={() => changePlay()} className='footer__icon footer__icon--play footer__icon--playGreen'/>
                }
                <SkipNextIcon onClick={() => handleNextChange()} className='footer__icon' />
                {
                    !repeat ?
                    <RepeatIcon onClick={() => dispatch(updateRepeat(true))} className='footer__icon' />
                    :
                    <RepeatIcon onClick={() => dispatch(updateRepeat(false))} className='footer__icon footer__green' />
                }
                <p>{millisToMinutesAndSeconds(30000)}</p>
            </div>
            <div className='footer__right'>
                <Grid container spacing={1}>
                    <Grid item>
                        <PlaylistPlayIcon />
                    </Grid>
                    <Grid item>
                        <VolumeDownIcon />
                    </Grid>
                    <Grid item xs>
                    <Slider value={value} onChange={handleChange} aria-labelledby="continuous-slider" />
                    </Grid>
                    <Grid item>
                        <VolumeUpIcon />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Footer
