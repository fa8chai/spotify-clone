export const initialState = {
    token: null,
    user: null,
    spotify: null,
    current_playlist: [],
    tracks: null,
    playlists: [],
    playing: false,
    track: null,
    current_time: 0,
    audio: null,
    repeat: false,
    shuffle: false,
    showLogout: false,
    value:30,

}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.payload
            };
        case 'SET_USER':
            return {
                ...state,
                user: action.payload
            };
        case 'SET_SPOTIFY':
            return {
                ...state,
                spotify: action.payload
            }
        case 'SET_PLAYLISTS':
            return {
                ...state,
                playlists: action.payload
            }
        case 'SET_CURRENT_PLAYLIST':
            let current_playlist = null
            state.playlists.items.forEach(playlist => {
                if (playlist.id === action.id) {
                    current_playlist = playlist
                }
            });
            return {
                ...state,
                current_playlist: current_playlist
            }
        case 'SET_TRACKS':
            return {
                ...state,
                tracks: action.payload
            }
        case 'SET_TRACK':
            return {
                ...state,
                track: action.payload
            }
        case 'SET_PLAY':
            return {
                ...state,
                playing: action.payload
            }
        case'SET_AUDIO':
            return {
                ...state,
                audio: action.payload
            }
        case 'UPDATE_TIME':
            return {
                ...state,
                current_time: action.payload
            }
        case 'SET_REPEAT':
            return {
                ...state,
                repeat: action.payload
            }
        case 'SET_SHUFFLE':
            return {
                ...state,
                shuffle: action.payload
            }
        case 'SET_PREV':
            var currentPlaylist = state.tracks.items;
            var tracksAmount = currentPlaylist.length -1;
            var currentTrackIndex = currentPlaylist.findIndex(action => action.track.id == state.track.id);
            var prevTrack = currentTrackIndex === 0 ? tracksAmount : currentTrackIndex -1;
            var trackToPlay = currentPlaylist[prevTrack].track;
            return {
                ...state,
                track: trackToPlay
            }
        case 'SET_NEXT':
            var currentPlaylist = state.tracks.items;
            var tracksAmount = currentPlaylist.length -1;
            var currentTrackIndex = currentPlaylist.findIndex(action => action.track.id == state.track.id);
            var nextTrack = currentTrackIndex == tracksAmount ? 0 : currentTrackIndex +1;
            var trackToPlay = currentPlaylist[nextTrack].track
            return {
                ...state,
                track: trackToPlay
            }
        case 'SET_LOGOUT':
            return {
                ...state,
                showLogout: action.payload
            }
        case 'SET_VALUE':
            return {
                ...state,
                value: action.payload
            }
        case 'LOGOUT':
            return state = {}
        default:
            return state;
    }
};

export default reducer;