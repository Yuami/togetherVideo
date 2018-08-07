var socket = io('http://localhost:2000');
socket.on('connect', function(){});
socket.on('event', function(data){});
socket.on('disconnect', function(){});

document.addEventListener('DOMContentLoaded', () => {
    // This is the bare minimum JavaScript. You can opt to pass no arguments to setup.
    const player = new Plyr('#player');

    // Bind event listener
    function on(selector, type, callback) {
        document.querySelector(selector).addEventListener(type, callback, false);
    }

    player.on('playing', () => {
        socket.emit('pPlay', {});
        console.log('emited');
    });

    socket.on('play', () => {
        player.play();
        console.log('All play - C');
    });
















    // Play
    on('.js-play', 'click', () => {
        pPlay();
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
});