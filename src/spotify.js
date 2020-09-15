

export const authEndpoint = 'https://accounts.spotify.com/authorize';

const redirectUri = 'https://spotify-clone-3c1bb.web.app';
const clientId = 'bf76aaae979f463c9d0becd2f7911e92';

const scops = [
    'user-read-currently-playing',
    'user-read-recently-played',
    'user-read-playback-state',
    'user-top-read',
    'user-modify-playback-state',
];

export const getTokenFromUrl = () => {
    return window.location.hash
        .substring(1)
        .split('&')
        .reduce((initial, item) => {
            let parts = item.split('=');
            initial[parts[0]] = decodeURIComponent(parts[1])
            return initial;

        }, {});
}

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scops.join("%20")}&response_type=token&show_dialog=true`; 
