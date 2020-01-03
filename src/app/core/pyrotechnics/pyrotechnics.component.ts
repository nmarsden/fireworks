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
  burstDelayInTenthsOfSecs: number;
  particleStaggeredDelayInHundredthOfSecs: number;
}

interface Range {
  lowerBound: number;
  upperBound: number;
}

interface BurstOptions {
  colours: string[];
  numBursts: Range;
  numParticles: Range;
  delayInTenthsOfSecs: Range;
  particleStaggeredDelayInHundredthOfSecs: Range;
}

@Component({
  selector: 'app-pyrotechnics',
  templateUrl: './pyrotechnics.component.html',
  styleUrls: ['./pyrotechnics.component.less']
})
export class PyrotechnicsComponent implements OnInit, OnChanges {
  @Input() isHidden = true;
  @Output() exited = new EventEmitter();

  bursts: Burst[] = [];
  timeoutId;

  burstOptions: BurstOptions = {
    colours: [ 'white', 'red', 'yellow', 'green', 'blue' ],
    numBursts: { lowerBound: 3, upperBound: 7 },
    numParticles: { lowerBound: 10, upperBound: 30 },
    delayInTenthsOfSecs: { lowerBound: 0, upperBound: 50 },
    particleStaggeredDelayInHundredthOfSecs: { lowerBound: -2, upperBound: 2 },
  };

  constructor(private modalService: ModalService) { }

  ngOnInit() {
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
    const maxBurstDelayInTenthsOfSecs = Math.max(...this.bursts.map(b => b.burstDelayInTenthsOfSecs));

    this.timeoutId = setTimeout(() => { this.setupRepeatingRandomBursts(); }, (10000 + (maxBurstDelayInTenthsOfSecs * 100)));
  }

  tearDownRepeatingRandomBursts() {
    this.bursts = [];
    clearTimeout(this.timeoutId);
  }

  rangeDifference(range: Range) {
    return (range.upperBound - range.lowerBound) + 1;
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
      const colour = o.colours[Math.floor(Math.random() * o.colours.length)];
      bursts.push({
        position: { x: xPos, y: yPos },
        numParticles,
        colour,
        rotateFraction: 360 / numParticles,
        burstDelayInTenthsOfSecs: delay,
        particleStaggeredDelayInHundredthOfSecs:  this.randomNumberInRange(o.particleStaggeredDelayInHundredthOfSecs)
      });
    }
    return bursts;
  }

  getParticleContainerTransform(i: number, position: Position, rotateFraction: number) {
    return {
      transform: `translate(${position.x}px, ${position.y}px) rotate(${i * rotateFraction}deg)`
    };
  }

  getParticleAnimationDelay(burst: Burst, particleIndex: number) {
    return {
      'animation-delay': `${(burst.burstDelayInTenthsOfSecs / 10) + (particleIndex * burst.particleStaggeredDelayInHundredthOfSecs / 100)}s`
    };
  }

  onColoursSelected(colours: string[]) {
    this.burstOptions.colours = colours;
  }

  onBurstRangeChanged(event: MultiRangeValues) {
    this.burstOptions.numBursts = { lowerBound: event.lowerValue, upperBound: event.upperValue };
  }

  onParticleRangeChanged(event: MultiRangeValues) {
    this.burstOptions.numParticles = { lowerBound: event.lowerValue, upperBound: event.upperValue };
  }

  onDelayRangeChanged(event: MultiRangeValues) {
    this.burstOptions.delayInTenthsOfSecs = { lowerBound: event.lowerValue, upperBound: event.upperValue };
  }

  delayValueDisplayFn(value) {
    return value / 10;
  }

  onMenuButtonClicked() {
    this.tearDownRepeatingRandomBursts();
    this.modalService.open('pyrotechnics-menu-modal');
  }

  onMenuModalClosed() {
    this.setupRepeatingRandomBursts();
  }

  onBackButtonClicked() {
    this.modalService.close('pyrotechnics-menu-modal');
    this.exited.emit();
  }
}
