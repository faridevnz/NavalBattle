import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  // props
  @Input() color: string = '#FFFFFF'
  @Input() width: string | number = 30  // in vw
  @Input() height: string | number = 80  // in px
  // style to use in template
  style = {}

  constructor() {
  }

  ngOnInit(): void {
    // costruzione dell'oggetto style
    this.style['background-color'] = this.color;
    this.style['width'] = `${this.width}vw`; 
    this.style['height'] = `${this.height}px`;
  }

}
