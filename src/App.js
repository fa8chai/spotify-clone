import React, { useEffect } from 'react';
import './App.css';
import Login from './Login';
import { setCurrentPlaylist, setDiscoverWeekly, setPlaylists, setSpotify, setToken, setTrack, setUser } from './reduxConfig/actions';
import { getTokenFromUrl } from './spotify';
import { useDispatch, useSelector } from 'react-redux';
import SpotifyWebApi from 'spotify-web-api-js';
import Player from './Player';

const spotify = new SpotifyWebApi();

function App() {

  const dispatch = useDispatch();
  const token = useSelector(state => state.token);


  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = '';
    const _token = hash.access_token;
    if (_token) {
      dispatch(setToken(_token));

      spotify.setAccessToken(_token);
      dispatch(setSpotify(spotify));

      spotify.getMe().then((user) => {
        dispatch(setUser(user));
        
      })
      spotify.getUserPlaylists().then(playlists => {
          dispatch(setPlaylists(playlists));
          dispatch(setCurrentPlaylist(playlists.items[0].id));
          
          spotify.getPlaylistTracks(playlists.items[0].id).then(res => {
            dispatch(setTrack(res.items[0].track))
          })
      })

    }
  }, [])

  return (
    <div className="app">
      {
        token ? ( <Player /> ) : ( <Login /> )
      }
    </div>
  );
}

export default App;
