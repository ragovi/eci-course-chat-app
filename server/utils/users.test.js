const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    }, {
      id: '2',
      name: 'Jen',
      room: 'React Course'
    }, {
      id: '3',
      name: 'Julie',
      room: 'Node Course'
    }];
  });

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'Raúl',
      room: 'The Office Fans'
    };
    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toMatchObject([user]);
  });

  it('should remove an user', () => {
    var userId = '1';
    var userRemoved = users.removeUser(userId);

    expect(userRemoved).toBeTruthy();
    expect(userRemoved.id).toBe(userId);
    expect(userRemoved.name).toBe('Mike');
    expect(users.users.length).toBe(2);
  });

  it('should not remove an user', () => {
    var userId = '123';
    var userRemoved = users.removeUser(userId);

    expect(userRemoved).toBeFalsy();
    expect(users.users.length).toBe(3);
  });

  it('should find user', () => {
    var userId = '2';
    var user = users.getUser(userId);

    expect(user).toBeTruthy();
    expect(user.id).toBe(userId);
  });

  it('should not find user', () => {
    var userId = '123';
    var user = users.getUser(userId);

    expect(user).toBeFalsy();
  });

  it('should return names for node course', () => {
    var userList = users.getUserList('Node Course');

    expect(userList).toMatchObject(['Mike', 'Julie']);
  });

  it('should return names for react course', () => {
    var userList = users.getUserList('React Course');

    expect(userList).toMatchObject(['Jen']);
  });

});
