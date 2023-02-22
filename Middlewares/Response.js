const SendError = (res, e) => {
  res.status(400).send({ success: false, error: e.message });
};

module.exports = SendError;
