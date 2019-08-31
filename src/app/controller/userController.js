const api = require("../../api");

class UserController {
  async index(req, res) {
    const { username } = req.headers;
    const response = await api.get(`/users/${username}`);

    if (!response) {
      return res.status(401).json({
        error: "Acesso negado",
        msg: "Usuário não encontrado",
      });
    }
    return res.json({ ok: "ok" });
  }
}

module.exports = new UserController();
