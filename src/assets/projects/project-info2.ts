const code = `import moment from 'moment';

document.getElementById('time').innerHTML = moment().format('MMMM Do YYYY, h:mm:ss a');

// This is an update of the code shown before!
`;

const html = `<h1>I was created on <span id='time'></span></h1>`

export const project2 = {
  files: {
    'index.ts': code,
    'index.html': html
  },
  title: 'Dynamically Generated Project',
  description: 'Example project',
  template: 'typescript',
  tags: ['stackblitz', 'sdk'] ,
  dependencies: {
    moment: '*' // * = latest version
  }
};