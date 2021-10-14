class ResponseHandler {
  static sendMessage(code, message, data, count) {
    const msg = {
      statusCode: code,
      message: message || '',
      data: data || [],
      count: count || 0,
    };
    return msg;
  }
}

module.exports = { ResponseHandler };
