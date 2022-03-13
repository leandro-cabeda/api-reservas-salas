module.exports = app => {

    const { auth, createSchedule, listRoom, findRoomId, listScheduleByRoomId } = app.src.service.index;

    return {
        auth: (req, res) => auth(req, res),
        createSchedule: (req, res) => createSchedule(req, res),
        listRoom: (req, res) => listRoom(req, res),
        findRoomId: (req, res) => findRoomId(req, res),
        listScheduleByRoomId: (req, res) => listScheduleByRoomId(req, res),
    }

};