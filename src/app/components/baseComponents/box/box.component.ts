import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

interface boxState {
  busy: boolean,
  bomb: boolean,
  alignQueue: string[],
  align: string
}
interface dropEvent {
  component: BoxComponent,
  event: Event
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
  @Input() border: boolean = true
  @Input() latest: boolean = false
  // event
  @Output() onDrop: EventEmitter<dropEvent> = new EventEmitter<dropEvent>()
  @Output() onRightClick: EventEmitter<dropEvent> = new EventEmitter<dropEvent>()
  @Output() onLeftClick: EventEmitter<dropEvent> = new EventEmitter<dropEvent>()


  constructor() { }

  ngOnInit(): void {

  }


  // FUNCTIONS

  draggedOver(event): void {
    event.preventDefault()
  }

  droppedItem(event: DragEvent): void {
    this.onDrop.emit({ component: this, event: event })
  }

  leftClick(event: Event): void {
    this.onLeftClick.emit({ component: this, event: event })
  }

  rightClick(event: Event): boolean {
    // ritorniamo 'false' per non fare aprira la tendina
    this.onRightClick.emit({ component: this, event: event })
    return false
  }

}
