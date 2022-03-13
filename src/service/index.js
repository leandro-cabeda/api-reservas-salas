const moment = require('moment-timezone');
const { Op } = require("sequelize");
const { createToken, verifyRoomsAvailable } = require('../util');

module.exports = app => {

  const User = app.src.model.User;
  const Room = app.src.model.Room;
  const Schedule = app.src.model.Schedule;

  return {
    auth: (req, res) => {

      const usu = req.body;

      User.findOne({
        where: {
          email: usu.email,
          senha: usu.senha
        }
      }).then(use => {

        if (!use) return res.status(400).json({ message: "Usuário não cadastrado!" });

        const token = createToken(usu);
        req.headers.authorization = "Bearer " + token;
        res.status(200).json({ token });

      }).catch(err => {
        res.status(500).json({ message: "Ocorreu falha durante a conexão do banco." });
      });

    },

    createSchedule: (req, res) => {

      const { data, roomId, periodo } = req.body;

      if (!roomId || isNaN(roomId)) return res.status(400).json({ message: "Parametro inválido RoomId!" });
      if (!data || data === "") return res.status(400).json({ message: "Parametro inválido Data!" });
      if (!periodo || periodo === "") return res.status(400).json({ message: "Parametro inválido Periodo!" });

      Room.findOne({
        where: {
          id: roomId
        }
      }).then(room => {

        if (!room) return res.status(400).json({ message: "Sala não cadastrado com roomId: " + roomId + " !" });

        Schedule.findOne({
          where: {
            salaId: roomId,
            periodo: periodo.toLowerCase(),
            data_agendamento: moment(data),
          }
        }).then(sche => {

          if (sche) return res.status(400).json({ message: `Agendamento com roomId: ${roomId} , data: ${data} e periodo: ${periodo} já está cadastrado!` });

          Schedule.create({

            salaId: roomId,
            data_agendamento: moment(data),
            periodo: periodo.toLowerCase(),
          })
            .then(scheduleCreate => {

              res.status(201).json({ message: "Criado agendamento com sucesso", data: scheduleCreate });

            }).catch(err => {
              res.status(500).json({ message: "Ocorreu falha durante a conexão do banco." });
            });

        }).catch(err => {
          res.status(500).json({ message: "Ocorreu falha durante a conexão do banco." });
        });

      }).catch(err => {
        res.status(500).json({ message: "Ocorreu falha durante a conexão do banco." });
      });
    },

    listRoom: (req, res) => {

      const { date } = req.query;

      if (!date || date === "") return res.status(400).json({ message: "Parametro inválido Date!" });

      const data = moment(date).toISOString();

      Schedule.findAll({

        order: [
          ["id", "asc"]
        ],
        include: [
          {
            model: Room,
            attributes: ['nome', 'descricao']
          }
        ],
        where: {
          data_agendamento: {
            [Op.eq]: data
          },
        },
        attributes: ['periodo', 'data_agendamento', 'salaId']
      })
        .then(schedulesRooms => {

          let rooms = [];
          if (schedulesRooms && schedulesRooms.length) {

            rooms = verifyRoomsAvailable(rooms, schedulesRooms);
          }

          res.status(200).json({ message: "Busca das salas que foram agendadas referente os periodos cadastrados", data: rooms });

        }).catch(err => {
          res.status(500).json({ message: "Ocorreu falha durante a conexão do banco." });
        });

    },

    findRoomId: (req, res) => {

      const { id } = req.params;

      if (!id || isNaN(id)) return res.status(400).json({ message: "Parametro inválido Id!" });


      Room.findOne({

        where: {
          id
        },
        attributes: ['nome', 'descricao', 'imagem']
      })
        .then(room => {

          if (!room) return res.status(400).json({ message: "Sala não cadastrado com id: " + id + " !" });

          res.status(200).json({ message: "Busca realizado com sucesso", data: room });

        }).catch(err => {
          res.status(500).json({ message: "Ocorreu falha durante a conexão do banco." });
        });

    },

    listScheduleByRoomId: (req, res) => {

      const { roomId } = req.params;

      if (!roomId || isNaN(roomId)) return res.status(400).json({ message: "Parametro inválido RoomId!" });


      Schedule.findAll({

        order: [
          ["id", "desc"]
        ],
        where: {
          salaId: roomId
        },
        attributes: ['periodo', 'data_agendamento']
      })
        .then(schedulesByRoom => {

          if (!schedulesByRoom || !schedulesByRoom.length) return res.status(404).json({ message: "Reservas não encontradas com roomId: " + roomId + " !" });

          res.status(200).json({ message: "Busca das reservas agendadas", data: schedulesByRoom });

        }).catch(err => {
          res.status(500).json({ message: "Ocorreu falha durante a conexão do banco." });
        });

    },
  }

};
