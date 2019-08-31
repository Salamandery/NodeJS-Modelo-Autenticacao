const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const api = require("../../api");

class SessionController {
  async getToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        error: "Ação negada.",
        msg: "É necessário estar logado na aplicação",
      });
    }
    const [, token] = authHeader.split(" ");

    try {
      const verified = await promisify(jwt.verify)(
        token,
        process.env.APPSECRET
      );
      req.username = verified.username;

    } catch (err) {
      return res.status(400).json({
        error: "Erro inesperado.",
        msg: "Erro ao verificar acesso.",
      });
    }
    return next();
  }

  async setToken(req, res) {
    const { username } = req.body;

    try {
      const response = await api.get(`/users/${username}`);
      if (response.data.name) {
        return res.status(200).json({
          user: {
            username,
          },
          token: jwt.sign(
            {
              username,
            },
            process.env.APPSECRET || "#123",
            {
              expiresIn: "1d",
            }
          ),
        });
      }
    } catch (err) {
      return res.status(400).json(err);
    }
  }
}

module.exports = new SessionController();
