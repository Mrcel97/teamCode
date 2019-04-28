const code = `import moment from 'moment';

document.getElementById('time').innerHTML = moment().format('MMMM Do YYYY, h:mm:ss a');
`;

const html = `<h1>I was created on <span id='time'></span></h1>`

export const project = {
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