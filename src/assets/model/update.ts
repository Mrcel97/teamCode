import { File, fileFactory } from './file';
import { User, userFactory } from './user';

export class Update {
  constructor (
    public id: number,
    public files: File[],
    public user: User,
  ) {}
}

export function updateFactory(id: number, files: File[], modification: string, line: number, user: User) {
  return new Update(id, files, user);
}

// This function is only to simulate the reception of data modified by another user.
export function sampleUpdateClass() {
  return new Update(
    1,
    [
      fileFactory(
        'index.ts',
        userFactory(
          '1',
          'John Doe',
        ),
        `import moment from 'moment';\r\nimport example from 'moment'; // This is an update\r\n\r\ndocument.getElementById('time').innerHTML = moment().format('MMMM Do YYYY, h:mm:ss a');\r\n`
      ),
      fileFactory(
        'index.html',
        userFactory(
          '1',
          'John Doe',
        ),
        `<h1>I was created on <span id='time'></span></h1>`
      ),
    ],
    userFactory(
      '2',
      'Doe John'
    )
  );
}