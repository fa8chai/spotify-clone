import store from './store';

export const millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${(seconds < 10 ? "0" : "")}${seconds}`;
}


export const setToken = (payload) => {
    return {
        type: 'SET_TOKEN',
        payload
    }
}

export const setUser = (payload) => {
    return {
        type: 'SET_USER',
        payload
    }
}

export const setSpotify = (payload) => {
    return {
        type: 'SET_SPOTIFY',
        payload
    }
}
export const setPlaylists = (payload) => {
    return {
        type: 'SET_PLAYLISTS',
        payload
    }
}

export const setCurrentPlaylist = (payload) => {
    return {
        type: 'SET_CURRENT_PLAYLIST',
        id: payload
    }
}

export const setTracks = (payload) => {
    return {
        type: 'SET_TRACKS',
        payload
    }
}

export const setTrack = (payload) => {
    return {
        type: 'SET_TRACK',
        payload
    }
}

export const setPlay = (payload) => {
    return {
        type: 'SET_PLAY',
        payload
    }
}

export const setAudio = (payload) => {
    return {
        type: 'SET_AUDIO',
        payload
    }
}

export const updateTime = (payload) => {
    return {
        type: 'UPDATE_TIME',
        payload
    }
}

export const updateRepeat = (payload) => {
    return {
        type: 'SET_REPEAT',
        payload
    }
}

export const updateShuffle = (payload) => {
    return {
        type: 'SET_SHUFFLE',
        payload
    }
}
export const setPrev = (track) => {
    return {
        type: 'SET_PREV',
        track: track

    }
}

export const setNext = (track) => {
    return {
        type: 'SET_NEXT',
        track: track
    }
}

export const setLogout = (payload) => {
    return {
        type: 'SET_LOGOUT',
        payload
    }
}

export const setValue = (payload) => {
    return {
        type: 'SET_VALUE',
        payload
    }
}

export const logout = () => {
    return {
        type: 'LOGOUT',
    }
}