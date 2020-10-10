// These functions just simply play or pause the player
// Created for event listeners

//-----------------------------------------------------------------------------

function playOther(roomnum) {
    socket.emit('play other', {
        room: roomnum
    });
}

socket.on('justPlay', function (data) {
    if (media.paused) {
        media.play();
    }
});

function pauseOther(roomnum) {
    socket.emit('pause other', {
        room: roomnum
    });
}

socket.on('justPause', function (data) {
    media.pause();
});

function seekOther(roomnum, currTime) {
    socket.emit('seek other', {
        room: roomnum,
        time: currTime
    });
    // socket.emit('getData');
}


// Weird for YouTube because there is no built in seek event
// It seeks on an buffer event
// Only syncs if off by over .2 seconds
socket.on('justSeek', function (data) {
    console.log("Seeking Event!")
    currTime = data.time

    var clientTime = media.currentTime
    if (clientTime < currTime - .2 || clientTime > currTime + .2) {
        media.currentTime = currTime
    }
});

// Needs to grab the next video id and change the video
function playNext(roomnum) {
    socket.emit('play next', {}, function (data) {
        var videoId = data.videoId

        // IF queue is empty do not try to change
        if (videoId !== "QUEUE IS EMPTY") {
            // Change the video
            socket.emit('change video', {
                room: roomnum,
                videoId: videoId,
                time: 0
            })
        } else {
            playNextAlert()
        }
    })
}