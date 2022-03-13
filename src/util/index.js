const jwt = require('jsonwebtoken');
const secret = "kjiw#$kk@lç*&jm";

const authenticationToken = (req, res, next) => {

  let auth = req.headers.authorization;

  if (auth) {
    auth = req.headers.authorization.split(' ')[1];
    if (auth) {
      jwt.verify(auth, secret, function (err) {
        if (err) {
          res.status(401).json("Token inválido, precisa realizar a autenticação!");
        } else {
          next();
        }
      });

    } else {
      res.status(401).json("Usuário não autorizado para acessar essa url, precisa se autenticar primeiro!");
    }
  } else {
    res.status(401).json("Usuário não autorizado para acessar essa url, precisa se autenticar primeiro!");
  }

}


const createToken = user => {

  const token = jwt.sign({
    email: user.email,
    senha: user.senha
  },
    secret,
    {
      expiresIn: 3600
    });

  return token;
}

const verifyRoomsAvailable = (rooms, schedulesRooms) => {

  let ids = [];
  schedulesRooms.forEach(sr => {

    if (!ids.includes(sr.salaId)) {
      ids.push(sr.salaId);
      const periodos = ['manha', 'tarde', 'noite'];
      const listaRooms = schedulesRooms.filter(srs => srs.salaId === sr.salaId);
      const retornoLista = listaRooms.filter(l => periodos.includes(l.periodo));

      if (retornoLista.length < 3) retornoLista.forEach(r => rooms.push(r));
    }
  });

  return rooms;
}

module.exports = {
  authenticationToken,
  createToken,
  verifyRoomsAvailable
}