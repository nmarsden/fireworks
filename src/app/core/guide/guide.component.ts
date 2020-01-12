import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output } from '@angular/core';

interface FixedPosition {
  top: number;
  right: number;
  left: number;
  height: number;
}

interface GuideElement {
  position: FixedPosition;
  text: string;
}

interface GuideMenu {
  position: FixedPosition;
}

interface ElementGuideOption {
  elementSelector: string;
  guideText: string;
}

interface GuideMenuOptions {
  elementSelector: string;
}

export interface GuideOptions {
  elementGuides: ElementGuideOption[];
  menu: GuideMenuOptions;
}

const EMPTY_GUIDE_OPTIONS: GuideOptions = {
  elementGuides: [],
  menu: {
    elementSelector: null
  }
};

const DEFAULT_GUIDE_MENU: GuideMenu = {
  position: {
    top: 0,
    right: 0,
    left: 0,
    height: null
  }
};

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.less']
})
export class GuideComponent implements OnInit, OnChanges {

  @Input() guideOptions: GuideOptions = EMPTY_GUIDE_OPTIONS;
  @Output() cancelButtonClicked = new EventEmitter();

  guideElements: GuideElement[] = [];
  guideMenu: GuideMenu;

  constructor() { }

  ngOnInit() {
    this.updateGuide();
  }

  ngOnChanges() {
    this.updateGuide();
  }

  calcFractionOfPlayedTileWidthInPx(fraction: number, clientWidth: number): number {
    const playedTileWidthInVw = getComputedStyle(document.documentElement).getPropertyValue('--played-tile-width');

    const playedTileWidthInPx = (parseInt(playedTileWidthInVw.slice(0, -2), 10) / 100) * clientWidth;
    return fraction * playedTileWidthInPx;
  }

  populateGuideElements(elementGuides: ElementGuideOption[], clientWidth: number, elementGuidePaddingPx: number): GuideElement[] {
    const elements = [];
    // Position each guide element so that it surrounds the target element
    elementGuides.forEach(guideOption => {
      const targetElement = document.documentElement.querySelector(guideOption.elementSelector);
      const rect = targetElement.getBoundingClientRect();

      elements.push({
        position: {
          top: Math.floor(rect.top) - elementGuidePaddingPx,
          left: Math.floor(rect.left) - elementGuidePaddingPx,
          right: Math.floor(clientWidth - (rect.left + rect.width + elementGuidePaddingPx)),
          height: Math.floor(rect.height) + (2 * elementGuidePaddingPx)
        },
        text: guideOption.guideText
      });
    });
    return elements;
  }

  populateGuideMenu(menu: GuideMenuOptions, menuHeightPx: number, elementGuidePaddingPx: number): GuideMenu {
    if (menu.elementSelector === null) {
      return DEFAULT_GUIDE_MENU;
    }
    const targetElement = document.documentElement.querySelector(menu.elementSelector);
    const rect = targetElement.getBoundingClientRect();
    // Position the menu above the target element
    return {
      position: {
        top: Math.floor( rect.top ) - (menuHeightPx + (2 * elementGuidePaddingPx)),
        left: 0,
        right: null,
        height: null
      }
    };
  }

  @HostListener('window:resize', [])
  updateGuide() {
    const clientWidth = document.documentElement.clientWidth;
    const elementGuidePaddingPx = this.calcFractionOfPlayedTileWidthInPx(0.15, clientWidth);
    const menuHeightPx = this.calcFractionOfPlayedTileWidthInPx(1, clientWidth);

    this.guideElements = this.populateGuideElements(this.guideOptions.elementGuides, clientWidth, elementGuidePaddingPx);
    this.guideMenu = this.populateGuideMenu(this.guideOptions.menu, menuHeightPx, elementGuidePaddingPx);
  }

  onCancelButtonClick() {
    this.cancelButtonClicked.emit();
  }
}
