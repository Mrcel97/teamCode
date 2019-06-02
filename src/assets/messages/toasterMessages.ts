import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';

export class ToasterMessages {
  private toastr: ToastrService;

  constructor(toastr: ToastrService) {
    this.toastr = toastr;
  }
  
  writeRequestInfo(requests: Array<string>) {
    if (requests.length > 0) {
      this.toastr.info('New write requests received, go to: Options > Make writer', 'Write Request Found')
        .onHidden
        .pipe(
          tap(_ => alert('Toast destroyed!'))
        );
    }
  }

  updateStatusInfo(status: string) {
    this.toastr.info('Writer status received, now you are a project ' + status, 'Write Status: ' + status);
  }

  addCollaboratorInfo(collaborators: Array<string>) {
    var message = `<div><p>Successfully granted collaborator role to:</p><ul>`;
    var shownCollaborators = [];

    collaborators.forEach(collaborator => {
      if (shownCollaborators.includes(collaborator)) return; 
      shownCollaborators.push(collaborator);
      message = message + `<li>` + collaborator + `</li>`}
    );
    message = message + `</ul></div>`;
    this.toastr.info(message);
  }

  deleteCollaboratorInfo(collaboratorEmail) {
    this.toastr.info('Successfully removed collaborator role from: ' + collaboratorEmail, 'Collaborator Deleted');
  }

  alertInnactivity() {
    this.toastr.warning('Detected innactivity, in 2min the Writer status will be given to the first writer request.', 'Innactivity Alert');
  }
}