// var date = new Date();
// var months = ['Enero', 'Febrero'];
// console.log(date.getMonth());
var moment = require('moment');
moment.locale('es');


var someTiemestamp = moment().valueOf();
console.log(someTiemestamp);

var createdAt = 1234
var date = moment(createdAt);
// date.add(100, 'year').subtract(9, 'months');
console.log(date.format('h:mm a'));
