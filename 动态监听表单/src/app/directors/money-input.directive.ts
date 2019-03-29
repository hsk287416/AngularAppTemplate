import { Directive, ElementRef, HostListener, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Directive({
  selector: '[appMoneyInput]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return MoneyInputDirective; }),
    multi: true,
  }]
})
export class MoneyInputDirective implements ControlValueAccessor {

  private onModelChange = (_) => { };

  constructor(private elementRef: ElementRef) { }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    value = this.formatNumber(value);
    this.elementRef.nativeElement.value = value;
    this.onModelChange(value);
  }

  writeValue(obj: any): void {
    obj = this.formatNumber(obj);
    this.onModelChange(obj);
  }
  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }
  registerOnTouched(fn: any): void {

  }
  setDisabledState?(isDisabled: boolean): void {

  }

  formatNumber(value: string): string {
    value = value.replace(/,/g, '');
    let result = '';
    let charCount = 0;
    for (let i = value.length - 1; i >= 0; i--) {
      if (/[0-9]/.test(value.charAt(i))) {
        if (charCount === 3) {
          result = ',' + result;
          charCount = 0;
        }
        result = value.charAt(i) + result;
        charCount++;
      }
    }
    return result;
  }

}
