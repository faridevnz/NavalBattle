import { Component, Input, OnInit } from '@angular/core';

interface boxState {
  busy: boolean,
  destroyed: boolean,
  alignQueue: string[]
}

// Component
@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss']
})
export class BoxComponent implements OnInit {
  // props
  @Input() state: boxState;
  @Input() align: string;
  @Input() border: boolean = true;

  constructor() { }

  ngOnInit(): void {

  }

}
