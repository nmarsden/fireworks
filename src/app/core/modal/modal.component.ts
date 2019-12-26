import {
  Component,
  ViewEncapsulation,
  ElementRef,
  Input,
  OnInit,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  Output,
  EventEmitter
} from '@angular/core';
import { ModalService } from '../../modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: 'modal.component.html',
  styleUrls: ['modal.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit, OnChanges, OnDestroy {
  @Input() id: string;
  @Input() isOpen = false;
  @Input() isFullScreen = false;
  @Input() position: string;
  @Output() cancelled = new EventEmitter<string>();

  private element: any;
  private isInitialized = false;

  constructor(private modalService: ModalService, private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    // ensure id attribute exists
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // cancel modal on background click
    this.element.addEventListener('click', el => {
      if (el.target.classList.contains('app-modal')) {
        this.cancel();
      }
    });

    // add self (this modal instance) to the modal service so it's accessible from controllers
    this.modalService.add(this);

    if (this.isOpen) {
      this.open();
    }
    this.isInitialized = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (typeof changes.isOpen !== 'undefined' && changes.isOpen.currentValue && this.isInitialized) {
      this.modalService.open(this.id);
    } else if (typeof changes.isOpen !== 'undefined' && !changes.isOpen.currentValue && this.isInitialized) {
      this.modalService.close(this.id);
    }
  }

  // remove self from modal service when component is destroyed
  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  // open modal
  open(): void {
    this.element.classList.add('app-modal-open');
    // document.body.classList.add('app-modal-open');
  }

  // close modal
  close(): void {
    this.element.classList.remove('app-modal-open');
    // document.body.classList.remove('app-modal-open');
  }

  // cancel modal
  cancel(): void {
    this.cancelled.emit(this.id);

    this.close();
  }

  isModalOpen(): boolean {
    return this.element.classList.contains('app-modal-open');
  }
}
