import { Component, Input, OnInit } from '@angular/core';

interface boxState {
  busy: boolean,
  bomb: boolean,
  alignQueue: string[]
}
interface boxNeigh {
  top: number,
  right: number,
  bottom: number,
  left: number
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
  neighbors: boxNeigh = { top: 0, right: 0, bottom: 0, left: 0 }

  constructor() { }

  ngOnInit(): void {

  }

}
