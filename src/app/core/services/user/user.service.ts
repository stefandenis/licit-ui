import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  getUserProfileData() {
    return of({
      profile: { displayName: 'andrei cristina' },
    });
  }
}
