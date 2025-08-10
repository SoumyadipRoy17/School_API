function success(res, data = {}, message = "OK", code = 200) {
  return res.status(code).json({ message, ...data });
}

function error(res, message = "Internal server error", code = 500) {
  return res.status(code).json({ error: message });
}

module.exports = { success, error };
