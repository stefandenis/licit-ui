import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.mock.service';
import { ThemeService } from 'src/app/core/services/theme/theme.service';
import { logout } from 'src/app/store/auth/auth.actions';
import { DisplayProfile } from 'src/app/store/auth/auth.reducer';
import {
  displayProfile,
  isAuthenticated,
} from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnDestroy {
  isDarkTheme: boolean;
  isAuthenticated: boolean = false;
  displayName: string | undefined;
  storeSubscription: Subscription;

  constructor(private store: Store<any>, private themeService: ThemeService) {
    this.themeService.initTheme();
    this.isDarkTheme = this.themeService.isDarkTheme();
    this.storeSubscription = this.store
      .pipe(select(isAuthenticated))
      .subscribe((value: any) => {
        this.isAuthenticated = value;
      });

    this.store.pipe(select(displayProfile)).subscribe((value) => {
      console.log(value);
      this.displayName = value?.displayName;
    });
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }

  toggleTheme() {
    this.themeService.updateTheme();
  }

  logout() {
    this.store.dispatch(logout());
  }
}
