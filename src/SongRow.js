import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAudio, setPlay, setTrack } from './reduxConfig/actions';
import './SongRow.css';
import { millisToMinutesAndSeconds } from './reduxConfig/actions';
import TextTruncate from 'react-text-truncate';

function SongRow({ track }) {
    const dispatch = useDispatch();
    const audio = useSelector(state => state.audio);

    const changeTrack = () => {
        dispatch(setTrack(track));
        if(!audio){
            let _audio = new Audio(track.preview_url);
            if(track.preview_url == null){
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
            let _audio = new Audio(track.preview_url);
            if(track.preview_url == null){
                alert('Audio is Not Provided!');
            }else{
            _audio.play();
            _audio.muted = false;
            dispatch(setPlay(true));
            dispatch(setAudio(_audio));
        }}
    }

    return (
        <div className='songRow' onClick={() => changeTrack()}>
            <div className='songRow__song'>
                <img
                    className='songRow__album'
                    src={track.album.images[0].url}
                    alt=''
                />
                <div className='songRow__info'>
                <TextTruncate
                    line={1}
                    element='h1'
                    truncateText='...'
                    text={track.name}
                />
                    <TextTruncate
                    line={1}
                    element='p'
                    truncateText='...'
                    text={track.artists.map(artist => artist.name).join(', ')}
                />
                </div>
            </div>
            <div className='songRow__album--table'>
            <TextTruncate
                    line={1}
                    element='p'
                    truncateText='...'
                    text={track.album.name}
                />
            </div>
            <div className='songRow__duration'>
                <p>{millisToMinutesAndSeconds(track.duration_ms)}</p>
            </div>
        </div>
    )
}

export default SongRow
