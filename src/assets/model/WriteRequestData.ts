export class WriteRequestData {
  requesterEmail: string;
  newWriterEmail: string;
  jsonRequests: string;
  requests: Map<string, Number>;
  writer: boolean;

  constructor(requesterEmail: string, writer?:boolean, requests?: Map<string, Number>, newWriterEmail?: string, transactionStatus?: boolean) {
    this.requesterEmail = requesterEmail;
    this.writer = writer;
    this.requests = requests;
    this.newWriterEmail = newWriterEmail;
  }

  generateJsonRequests() {
    var jsonRequests: Array<WriteRequest> = [];

    this.requests.forEach((value: Number, key: string) => {
      jsonRequests.push(new WriteRequest(key, value));
    });
    this.jsonRequests = JSON.stringify(jsonRequests);
  }
}

export function generateRequests(jsonRequestsString: string) {
  var requests: Map<string, Number> = new Map();
  var jsonRequests: Array<WriteRequest> = JSON.parse(jsonRequestsString);

  jsonRequests.forEach(writeRequest => {
    requests.set(writeRequest.requesterEmail, writeRequest.date);
  });
  return requests;
}

export class WriteRequest {
  requesterEmail: string;
  date: Number;

  constructor(requesterEmail: string, date: Number) {
    this.requesterEmail = requesterEmail;
    this.date = date;
  }
}