const { authenticationToken } = require('../util');

module.exports = app => {

     const { auth, createSchedule, listRoom, findRoomId, listScheduleByRoomId } = app.src.controller.index;

     app.get('/', (req, res) => res.send());

     app.get('/room', authenticationToken, listRoom);

     app.get('/room/:id', authenticationToken, findRoomId);

     app.get('/schedule/:roomId', authenticationToken, listScheduleByRoomId);

     app.post('/auth', auth);

     app.post('/schedule', authenticationToken, createSchedule);

};
