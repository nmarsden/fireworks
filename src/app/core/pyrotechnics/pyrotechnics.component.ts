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
  particleStaggeredDelayInMSecs: number;
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
  particleStaggeredDelayInMSecs: Range;
  centerOffsetX: Range;
  centerOffsetY: Range;
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
    particleStaggeredDelayInMSecs: { lowerBound: -20, upperBound: 20 },
    centerOffsetX: { lowerBound: -10, upperBound: 10 },
    centerOffsetY: { lowerBound: -10, upperBound: 10 }
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
      const xPos = this.randomNumberInRange(o.centerOffsetX);
      const yPos = this.randomNumberInRange(o.centerOffsetY);
      const delay = this.randomNumberInRange(o.delayInTenthsOfSecs);
      const colour = o.colours[Math.floor(Math.random() * o.colours.length)];
      bursts.push({
        position: { x: xPos, y: yPos },
        numParticles,
        colour,
        rotateFraction: 360 / numParticles,
        burstDelayInTenthsOfSecs: delay,
        particleStaggeredDelayInMSecs:  this.randomNumberInRange(o.particleStaggeredDelayInMSecs)
      });
    }
    return bursts;
  }

  getParticleContainerTransform(burst: Burst, particleIndex: number) {
    return {
      transform: `translate(${burst.position.x}vw, ${burst.position.y}vh) rotate(${particleIndex * burst.rotateFraction}deg)`
    };
  }

  getParticleAnimationDelay(burst: Burst, particleIndex: number) {
    return {
      'animation-delay': `${(burst.burstDelayInTenthsOfSecs / 10) + (particleIndex * burst.particleStaggeredDelayInMSecs / 1000)}s`
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

  onCenterOffsetXRangeChanged(event: MultiRangeValues) {
    this.burstOptions.centerOffsetX = { lowerBound: event.lowerValue, upperBound: event.upperValue };
  }

  onCenterOffsetYRangeChanged(event: MultiRangeValues) {
    this.burstOptions.centerOffsetY = { lowerBound: event.lowerValue, upperBound: event.upperValue };
  }

  onParticleDelayRangeChanged(event: MultiRangeValues) {
    this.burstOptions.particleStaggeredDelayInMSecs = { lowerBound: event.lowerValue, upperBound: event.upperValue };
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
