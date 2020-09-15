

export const shuffleArray = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }

    return a;
}

export const getAudio = (a) => {
    let i =0;
    let array = shuffleArray(a);
    if( i > array.length ){
        array = shuffleArray(a);
        i = 0;
    }
    return array[i];
}


