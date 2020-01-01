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

  particleRange: Range = { lowerBound: 10, upperBound: 30 };

  constructor(private modalService: ModalService) { }

  ngOnInit() {
    this.colours = this.getCssVariableValues('--colour-red', '--colour-white', '--colour-yellow',
                                             '--colour-green', '--colour-orange', '--colour-blue');
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

    this.timeoutId = setTimeout(() => { this.setupRepeatingRandomBursts(); }, 10000 + (maxDelay * 1000));
  }

  tearDownRepeatingRandomBursts() {
    this.bursts = [];
    clearTimeout(this.timeoutId);
  }

  generateRandomBursts() {
    const bursts: Burst[] = [];
    const numBursts = 3 + Math.floor(Math.random() * 7);
    for (let i = 0; i < numBursts; i++) {
      const numParticles = 10 + Math.floor(Math.random() * 20);
      const xPos = Math.floor(Math.random() * 300) - 150;
      const yPos = Math.floor(Math.random() * 300) - 150;
      const delay = Math.random() * 5;
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

  getCssVariableValues(...cssVariableNames: string[]): string[] {
    const computedStyle = getComputedStyle(document.documentElement);
    return cssVariableNames.map(cssVarName => computedStyle.getPropertyValue(cssVarName));
  }

  setTransform(i: number, position: Position, rotateFraction: number) {
    return {
      transform: `translate(${position.x}px, ${position.y}px) rotate(${i * rotateFraction}deg)`
    };
  }

  onMenuClicked() {
    this.modalService.open('pyrotechnics-menu-modal');
  }

  particleRangeChanged(event: MultiRangeValues) {
    this.particleRange.lowerBound = event.lowerValue;
    this.particleRange.upperBound = event.upperValue;
  }

  onExitClicked() {
    this.modalService.close('pyrotechnics-menu-modal');
    this.exited.emit();
  }
}
