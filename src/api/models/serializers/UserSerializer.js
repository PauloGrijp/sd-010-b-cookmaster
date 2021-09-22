class UserSerializer {
  constructor() {
    this.id = null;
    this.name = null;
    this.email = null;
    this.role = null;
    this.password = null;
  }

  serialize(user) {
    const { _id, name, email, role, password } = user;
    this.id = _id;
    this.name = name;
    this.email = email;
    this.role = role;
    this.password = password;
  }

  default(user) {
    this.serialize(user);
    return { name: this.name, email: this.email, role: this.role, _id: this.id };
  }
}

module.exports = new UserSerializer();