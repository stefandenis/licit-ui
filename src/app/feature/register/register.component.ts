import {
  Component,
  ElementRef,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { LoadingService } from 'src/app/core/services/loading/loading.service';
import { CustomValidators } from 'src/app/shared/custom-validators';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  buttonFocus: boolean = false;
  showButton: boolean = false;
  isTCchecked: boolean = false;
  tcHasError: boolean = false;
  passwordErrors = [
    {
      errorName: 'hasNoNumber',
      hasError: false,
      message: 'Parola trebuie sa contina cel putin 1 cifra',
    },
    {
      errorName: 'hasNoCapitalCase',
      hasError: false,
      message: 'Parola trebuie sa contina cel putin 1 litera mare',
    },
    {
      errorName: 'hasNoSmallCase',
      hasError: false,
      message: 'Parola trebuie sa contina cel putin 1 litera mica',
    },
    {
      errorName: 'minlength',
      hasError: false,
      message: 'Parola trebuie sa contina cel putin 8 caractere',
    },
  ];
  @Output() invalidFormField: EventEmitter<any> = new EventEmitter();
  constructor(
    private loadingService: LoadingService,
    private formBuilder: FormBuilder,
    private el: ElementRef,
    private registerService: RegisterService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        street: '',
        number: '',
        city: '',
        additionalDetails: '',
        phone: ['', [Validators.required]],
        password: [
          '',
          [
            Validators.required,
            CustomValidators.patternValidator(/\d/, { hasNoNumber: true }),
            CustomValidators.patternValidator(/[A-Z]/, {
              hasNoCapitalCase: true,
            }),
            CustomValidators.patternValidator(/[a-z]/, {
              hasNoSmallCase: true,
            }),
            Validators.minLength(8),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      {
        // check whether our password and confirm password match
        validator: CustomValidators.passwordMatchValidator,
      }
    );
    this.registerForm.valueChanges.subscribe((x) => {
      console.log(this.registerForm.controls['password']);
      this.passwordErrors.map(
        (passwordError) =>
          (passwordError.hasError = this.registerForm.controls[
            'password'
          ].hasError(passwordError.errorName))
      );
      console.log(this.passwordErrors);
      console.log(x);
    });
  }

  register() {
    if (this.registerForm.valid && this.isTCchecked) {
      this.loadingService.startLoadingScreen();
      setTimeout(() => {
        this.loadingService.stopLoadingScreenWithMessage(
          'Ati fost inregistrat cu succes'
        );
      }, 3000);
      console.log('valid');
    } else {
      console.log('invalid');
      this.registerForm.markAllAsTouched();
      this.registerService.invalidFormField.next();
      this.tcHasError = this.isTCchecked ? false : true;

      //
    }
  }

  get email() {
    return this.registerForm.get('email');
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get phone() {
    return this.registerForm.get('phone');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  acceptTandC(event: MatCheckboxChange) {
    this.isTCchecked = event.checked;
    if (event.checked) this.tcHasError = false;
  }
}
