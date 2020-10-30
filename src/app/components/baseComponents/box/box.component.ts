import { Component, Input, OnInit } from '@angular/core';

interface boxState {
  busy: boolean,
  destroyed: boolean,
  align: string,
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

  constructor() { }

  ngOnInit(): void {

  }

}
