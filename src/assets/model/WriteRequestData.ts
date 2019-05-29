export class WriteRequestData {
  requesterEmail: string;
  requests: {key: string, value: Number};
  writer: boolean;

  constructor(requesterEmail: string, requests: {key: string, value: Number}) {
    this.requesterEmail = requesterEmail;
    this.requests = requests;
  }
}