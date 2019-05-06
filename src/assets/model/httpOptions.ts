import { HttpHeaders } from '@angular/common/http';

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token',
    'Access-Control-Allow-Origin': '*'
  })
};

export const httpWorkspaceOptions = {
  headers: new HttpHeaders({
    Accept: 'application/json'
  })
}