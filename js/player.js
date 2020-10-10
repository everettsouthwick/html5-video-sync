var currPlayer = 3

socket.on('getPlayerData', function (data) {
    var roomnum = data.room
    var caller = data.caller

    var currTime = media.currentTime
    var state = media.paused
    socket.emit('get host data', {
        room: roomnum,
        currTime: currTime,
        state: state,
        caller: caller
    });
});