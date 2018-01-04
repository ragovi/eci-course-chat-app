[{
  id: 'fkjhfskhfjkfds',
  name: 'Raúl',
  room: 'The Office Fans'
}]

// addUser(id, name, room)
// removeUser(id), para actualizar la lista de usuarios cuando alguien se va
// getUser(id)
// getUserList(room)

class Users {
  constructor () {
    this.users = [];
  }
  addUser (id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }
  removeUser (id) {
    // mi solucion con una sola iteracion del array
    // var userRemoved;
    // this.users = this.users.filter((user) => {
    //   if (user.id === id) {
    //     userRemoved = user;
    //   }
    //   return user.id !== id;
    // });
    // return userRemoved;
    var user = this.getUser(id);

    if (user) {
      this.users = this.users.filter(user => user.id !== id);
    }

    return user;
  }
  getUser (id) {
    return this.users.filter(user => user.id === id)[0];
  }
  getUserByName (name) {
    return this.users.filter(user => user.name === name)[0];
  }
  getRooms() {
    return this.users.map((user) => user.room);
  }
  getUserList (room) {
    var users = this.users.filter((user) => user.room === room);
    var namesArray = users.map((user) => user.name);

    return namesArray;
  }
}

module.exports = {Users};

// class Person {
//   constructor (name, age) {
//     this.name = name;
//     this.age = age;
//   }
//   getUserDescription() {
//     return `${this.name} is ${this.age} year(s) old.`;
//   }
// }
//
// var me = new Person('Raúl', 38);
// var description = me.getUserDescription();
// console.log(description);
