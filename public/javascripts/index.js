const socket = io('http://localhost:2000');

document.addEventListener('DOMContentLoaded', () => {
    const url = document.getElementById('url');
    const container = document.getElementById('container');
    let player = null;

    function on(selector, type, callback) {
        document.querySelector(selector).addEventListener(type, callback, false);
    }

    const plyrInit = () => {
        player = new Plyr('#player');

        player.on('playing', () => {
            socket.emit('pPlay', {});
        });

        player.on('pause', () => {
            socket.emit('pPause', {});
        });

        player.on('progress', () => {
            if (player.buffered === 0) {
                socket.emit('pPause', {})
            } else {
                socket.emit('pPlay');
            }
        });

        let lastTime = player.currentTime;

        player.on('timeupdate', () => {
            let time = player.currentTime;
            if (lastTime > time || time - 3 > lastTime)
                socket.emit('pTimeChange', time);

            lastTime = time;
        });
    };

    socket.on('play', () => {
        player.play();
    });

    socket.on('pause', () => {
        player.pause();
    });

    socket.on('timeChange', (time) => {
        player.currentTime = time;
    });

    // Play
    on('.js-play', 'click', () => {
        player.play();
    });

    // Pause
    on('.js-pause', 'click', () => {
        player.pause();
    });

    // Stop
    on('.js-stop', 'click', () => {
        player.stop();
    });

    // Rewind
    on('.js-rewind', 'click', () => {
        player.rewind();
    });

    // Forward
    on('.js-forward', 'click', () => {
        player.forward();
    });

    const getID = (url) => {
        return new URLSearchParams((new URL(url)).search).get('v')
    };

    const changeVideo = (url) => {
        container.innerHTML =
            `<div id="player" data-plyr-provider="youtube" data-plyr-embed-id="${getID(url)}"></div>`;
        plyrInit();
    };

    socket.on('changeVideoURL', changeVideo);

    on('#btn-video', 'click', () => {
        changeVideo(url.value);
        socket.emit('handleVideoURL', url.value);
    });

    plyrInit();
});