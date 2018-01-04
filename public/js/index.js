var socket = io();

function populateRooms() {
  socket.on('connect', function () {

    socket.emit('getRooms', null, function (rooms) {
      var roomsSelect = jQuery('[name=rooms]');
      roomsSelect.children().remove();

      rooms.forEach((room) => {
        var item = jQuery('<option></option>');
        item.attr('value', room);
        item.text(room);
        roomsSelect.append(item);
        });
      socket.disconnect();
    });
  });

}
