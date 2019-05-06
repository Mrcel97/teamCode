import { HttpHeaders } from '@angular/common/http'

export const httpOptions = {
  headers: new HttpHeaders({
    Accept: 'application/vnd.github.VERSION.raw'
  })
}