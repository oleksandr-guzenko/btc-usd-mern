const socketIO = require('socket.io');
let io = null;
module.exports = {
    setIo: server => {
        io = socketIO(server);
    },
    getIo: () => {
        return io;
    }
}