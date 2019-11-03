import {
  Component,
  ViewEncapsulation,
  ElementRef,
  Input,
  OnInit,
  OnChanges,
  OnDestroy,
  SimpleChanges
} from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: 'modal.component.html',
  styleUrls: ['modal.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit, OnChanges, OnDestroy {
  @Input() id: string;
  @Input() isOpen: boolean = false;
  private element: any;
  private isInitialized: boolean = false;

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

    // close modal on background click
    this.element.addEventListener('click', el => {
      if (el.target.className === 'app-modal') {
        this.close();
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
    }
    else if (typeof changes.isOpen !== 'undefined' && !changes.isOpen.currentValue && this.isInitialized) {
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
    this.element.style.display = 'block';
    document.body.classList.add('app-modal-open');
  }

  // close modal
  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('app-modal-open');
  }
}
