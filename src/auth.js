class Authenticate {
  auth(req, res, next) {
    const { key } = req.headers;

    if (!key || key !== "atomiccodes@gobarber") {
      return res.status(401).json({
        error: "Metodo não autorizado.",
        msg: "Necessário ser credenciado.",
      });
    }

    return next();
  }
}

module.exports = new Authenticate();
