import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {toOptionalLiteralArray} from '@angular/compiler/src/render3/partial/util';

@Directive({
  selector: '[appLabel]'
})
export class LabelDirective implements OnInit {
  private _required: boolean = false;
  private i: any;
  nativeElement: any;
  @Input() label: string = '';

  @Input() set required(value: boolean) {
    this._required = value;
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.nativeElement = elementRef.nativeElement;
    this.i = this.renderer.createElement('i');
  }

  ngOnInit(): void {
    if (this._required) {
      this.setFieldRequired();
    } else {
      this.setFieldNoRequired();
    }
  }

  setFieldRequired() {
    this.nativeElement.innerText = this.label + ' ';
    const i = this.renderer.createElement('i');
    i.innerText = ' * ';
    this.renderer.addClass(i, 'p-error');
    this.renderer.appendChild(this.nativeElement, i);
  }

  setFieldNoRequired() {
    this.nativeElement.innerText = this.label + ' ';
  }
}
