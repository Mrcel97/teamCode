export class ChatMessage {
  owner: string;
  content: string;
  date: number;

  constructor(owner: string, content: string, date: number) {
    this.owner = owner;
    this.content = content;
    this.date = date;
  }
}