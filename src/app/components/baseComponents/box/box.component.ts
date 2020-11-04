import { Component, Input, OnInit } from '@angular/core';

interface boxState {
  busy: boolean,
  bomb: boolean,
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
  @Input() state: boxState
  @Input() align: string
  @Input() border: boolean = true
  @Input() latest: boolean = false

  constructor() { }

  ngOnInit(): void {

  }


  draggedOver(event) {
    event.preventDefault()
  }

  droppedItem(event) {
    console.log('DROPPED')
    console.log(event.dataTransfer.getData('text'))
  }

}
