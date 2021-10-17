import { Directive, ElementRef, HostListener } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { debounceTime, take } from 'rxjs/internal/operators';
import { RegisterService } from 'src/app/feature/register/register.service';

@Directive({
  selector: '[scrollToInvalidFormField]',
})
export class ScrollToInvalidFormFieldDirective {
  constructor(
    private el: ElementRef,
    private formGroupDir: FormGroupDirective,
    private registerService: RegisterService
  ) {
    this.registerService.invalidFormField.subscribe((event) => {
      console.log('invalid form field ');
      if (this.formGroupDir.control.invalid) {
        this.scrollToFirstInvalidControl();
      }
    });
  }

  // @HostListener('invalidFormField') onFormSubmit() {
  //   console.log('invalid form field ');
  //   if (this.formGroupDir.control.invalid) {
  //     this.scrollToFirstInvalidControl();
  //   }
  // }

  private scrollToFirstInvalidControl() {
    const firstInvalidControl: HTMLElement =
      this.el.nativeElement.querySelector('.ng-invalid input');

    window.scroll({
      top: this.getTopOffset(firstInvalidControl),
      left: 0,
      behavior: 'smooth',
    });

    fromEvent(window, 'scroll')
      .pipe(debounceTime(100), take(1))
      .subscribe(() => firstInvalidControl.focus());
  }

  private getTopOffset(controlEl: HTMLElement): number {
    const labelOffset = 50;
    return controlEl.getBoundingClientRect().top + window.scrollY - labelOffset;
  }
}
