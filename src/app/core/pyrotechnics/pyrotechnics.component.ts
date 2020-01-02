import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ModalService } from '../../modal.service';
import { MultiRangeValues } from '../range-slider/range-slider.component';

interface Position {
  x: number;
  y: number;
}
interface Burst {
  position: Position;
  numParticles: number;
  colour: string;
  rotateFraction: number;
  animationDelay: number;
}

interface Range {
  lowerBound: number;
  upperBound: number;
}

interface BurstOptions {
  numBursts: Range;
  numParticles: Range;
  delayInTenthsOfSecs: Range;
}

@Component({
  selector: 'app-pyrotechnics',
  templateUrl: './pyrotechnics.component.html',
  styleUrls: ['./pyrotechnics.component.less']
})
export class PyrotechnicsComponent implements OnInit, OnChanges {
  @Input() isHidden = true;
  @Output() exited = new EventEmitter();

  colours: string[] = [];
  bursts: Burst[] = [];
  timeoutId;

  burstOptions: BurstOptions = {
    numBursts: { lowerBound: 3, upperBound: 7 },
    numParticles: { lowerBound: 10, upperBound: 30 },
    delayInTenthsOfSecs: { lowerBound: 0, upperBound: 50 }
  };

  constructor(private modalService: ModalService) { }

  ngOnInit() {
    this.colours = [ 'blue', 'red', 'white', 'yellow', 'green' ];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isHidden) {
      this.tearDownRepeatingRandomBursts();
    } else {
      this.setupRepeatingRandomBursts();
    }
  }

  setupRepeatingRandomBursts() {
    this.bursts = this.generateRandomBursts();
    const maxDelay = Math.max(...this.bursts.map(b => b.animationDelay));

    this.timeoutId = setTimeout(() => { this.setupRepeatingRandomBursts(); }, (10000 + (maxDelay * 100)));
  }

  tearDownRepeatingRandomBursts() {
    this.bursts = [];
    clearTimeout(this.timeoutId);
  }

  rangeDifference(range: Range) {
    return (range.upperBound - range.lowerBound);
  }

  randomNumberInRange(range: Range) {
    return range.lowerBound + Math.floor(Math.random() * this.rangeDifference(range));
  }

  generateRandomBursts() {
    const o = this.burstOptions;
    const bursts: Burst[] = [];
    const numBursts = this.randomNumberInRange(o.numBursts);
    for (let i = 0; i < numBursts; i++) {
      const numParticles = this.randomNumberInRange(o.numParticles);
      const xPos = Math.floor(Math.random() * 300) - 150;
      const yPos = Math.floor(Math.random() * 300) - 150;
      const delay = this.randomNumberInRange(o.delayInTenthsOfSecs);
      const colour = this.colours[Math.floor(Math.random() * this.colours.length)];
      bursts.push({
        position: { x: xPos, y: yPos },
        numParticles,
        colour,
        rotateFraction: 360 / numParticles,
        animationDelay: delay
      });
    }
    return bursts;
  }

  setTransform(i: number, position: Position, rotateFraction: number) {
    return {
      transform: `translate(${position.x}px, ${position.y}px) rotate(${i * rotateFraction}deg)`
    };
  }

  burstRangeChanged(event: MultiRangeValues) {
    this.burstOptions.numBursts = { lowerBound: event.lowerValue, upperBound: event.upperValue };
  }

  particleRangeChanged(event: MultiRangeValues) {
    this.burstOptions.numParticles = { lowerBound: event.lowerValue, upperBound: event.upperValue };
  }

  delayRangeChanged(event: MultiRangeValues) {
    this.burstOptions.delayInTenthsOfSecs = { lowerBound: event.lowerValue, upperBound: event.upperValue };
  }

  delayValueDisplayFn(value) {
    return value / 10;
  }

  onMenuClicked() {
    this.tearDownRepeatingRandomBursts();
    this.modalService.open('pyrotechnics-menu-modal');
  }

  onMenuModalClosed() {
    this.setupRepeatingRandomBursts();
  }

  onExitClicked() {
    this.modalService.close('pyrotechnics-menu-modal');
    this.exited.emit();
  }
}
