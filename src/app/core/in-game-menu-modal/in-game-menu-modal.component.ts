import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalService } from '../../modal.service';

@Component({
  selector: 'app-in-game-menu-modal',
  templateUrl: './in-game-menu-modal.component.html',
  styleUrls: ['./in-game-menu-modal.component.less']
})
export class InGameMenuModalComponent implements OnInit {
  @Input() isOpen = false;
  @Output() guideButtonClicked = new EventEmitter();
  @Output() quitButtonClicked = new EventEmitter();

  constructor(private modalService: ModalService) { }

  ngOnInit() {
  }

  closeModal() {
    this.modalService.close('in-game-menu-modal');
  }

  onGuideButtonClicked() {
    this.closeModal();
    this.guideButtonClicked.emit();
  }

  onQuitButtonClicked() {
    this.closeModal();
    this.quitButtonClicked.emit();
  }

  onContinueButtonClicked() {
    this.closeModal();
  }
}
