class Blog {
  constructor(props) {
    this.author = props.author;
    this.title = props.title;
    this.createdDate = props.createdDate || new Date();
    this.DateUpdate = props.DateUpdate || new Date();
  }
}
