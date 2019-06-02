export class FeedItem {
  constructor(
    public type: string,
    public userId: string,
    public workspaceId: string,
    public date: Date,
    public userName: string,
    public workspacename: string,
    public id?: string
  ){
    this.date = new Date(date);
  }
}