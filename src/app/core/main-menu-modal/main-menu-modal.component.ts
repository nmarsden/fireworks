import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ModalService } from '../../modal.service';
import * as screenfull from 'screenfull';
import { Screenfull } from 'screenfull';

@Component({
  selector: 'app-main-menu-modal',
  templateUrl: './main-menu-modal.component.html',
  styleUrls: ['./main-menu-modal.component.less']
})
export class MainMenuModalComponent implements OnInit {
  @Input() playerNameOne: string;
  @Input() playerNameTwo: string;
  @Output() startButtonClicked = new EventEmitter<string[]>();

  sf: Screenfull = screenfull as Screenfull;
  isShowPlayerOneKeyboard = false;
  isShowPlayerTwoKeyboard = false;

  constructor(private modalService: ModalService) { }

  toggleFullScreen() {
    this.sf.toggle();
  }

  ngOnInit() {
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal() {
    this.modalService.close('main-menu-modal');
  }

  onPlayerOneClicked($event) {
    this.isShowPlayerOneKeyboard = true;
  }

  onPlayerTwoClicked($event) {
    this.isShowPlayerTwoKeyboard = true;
  }

  onPlayerOneKeyboardEnterClicked($event) {
    this.isShowPlayerOneKeyboard = false;
    this.playerNameOne = $event;
  }

  onPlayerTwoKeyboardEnterClicked($event) {
    this.isShowPlayerTwoKeyboard = false;
    this.playerNameTwo = $event;
  }

  onStartButtonClicked() {
    this.closeModal();
    this.startButtonClicked.emit([this.playerNameOne.toUpperCase(), this.playerNameTwo.toUpperCase()]);
  }

}
