import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  public invalidFormField = new Subject();
  constructor() {}
}
