class Post {
  constructor(params) {
    this.title = params.title;
    this.author = params.author;
    this.body = params.body;
    this.creationDate = new Date();
    this.updateDate = new Date();
  }
}
export default Post;
