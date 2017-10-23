const toExport = {
  send: function (state, session, ui, text) {
    const channel = session.channel;
    if (channel.id == undefined) {
    } else {
      channel.send(text);
    }
  },
  
  error: function () {
  },
};

module.exports = toExport;