class User {
  constructor(props) {
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.email = props.email;
    this.userName = props.userName;
    this.password = props.password;
    this.createdDate = new Date();
  }
}
