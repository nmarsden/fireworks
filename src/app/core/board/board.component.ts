import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Tile } from '../../tile';
import { TileHint } from '../../tile-hint';
import { Hands } from '../../hands';
import { GuideOptions } from '../guide/guide.component';

const EMPTY_GUIDE_OPTIONS: GuideOptions = {
  elementGuides: [],
  menu: {
    elementSelector: '.menu-and-deck-container'
  }
};

const BASIC_GUIDE_OPTIONS: GuideOptions = {
  elementGuides: [{
                    elementSelector: '#partner-tile-group',
                    guideText: 'Partner\'s cards'
                  }, {
                    elementSelector: '#player-tile-group',
                    guideText: 'Your cards'
                  }, {
                    elementSelector: '.token-container',
                    guideText: 'Tokens'
                  }, {
                    elementSelector: '.middle-tiles',
                    guideText: 'Played & Discarded cards'
                  }, {
                    elementSelector: '.menu-and-deck-container',
                    guideText: 'Menu & Deck'
                  }],
  menu: {
    elementSelector: '.token-container'
  }
};

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.less']
})
export class BoardComponent implements OnInit, OnChanges {
  @Input() playedTiles: Tile[];
  @Input() hands: Hands;
  @Input() discardedTiles: Tile[];
  @Input() chosenTile: Tile;
  @Input() isPartnerTilesChosen: boolean;
  @Input() partnerTileHintChosen: TileHint = TileHint.noHint();
  @Input() playerTileHintChosen: TileHint = TileHint.noHint();
  @Input() remainingTiles: number;
  @Input() infoTokens: number;
  @Input() fuseTokens: number;
  @Input() isShowPartnerHints = true;
  @Input() isShowPlayerHints = true;
  @Input() isHidden = false;
  @Input() partnerName: string;
  @Input() playerName: string;
  @Input() guideShown = 'none';
  @Input() isAnimOnShow = true;
  @Output() partnerTileHintClicked = new EventEmitter();
  @Output() playerTileHintClicked = new EventEmitter();
  @Output() partnerTileClicked = new EventEmitter<Tile>();
  @Output() playerTileClicked = new EventEmitter<Tile>();
  @Output() playerTileLongPressed = new EventEmitter<Tile>();
  @Output() menuButtonClicked = new EventEmitter();
  @Output() guideCancelButtonClicked = new EventEmitter();

  displayedPlayedTiles: Tile[];
  guideOptions: GuideOptions = EMPTY_GUIDE_OPTIONS;

  highestPlayedTiles = (playedTiles): Tile[] => {
    const colours: string[] = ['white', 'red', 'yellow', 'green', 'blue', 'rainbow'];
    const highestColourNumber: Map<string, Tile> = new Map();

    colours.forEach(c => highestColourNumber.set(c, new Tile(c, null)));
    playedTiles.forEach(t => {
      if (highestColourNumber.get(t.colour).number === null || (t.number > highestColourNumber.get(t.colour).number)) {
        highestColourNumber.set(t.colour, t);
      }
    });
    return Array.from(highestColourNumber.values());
  }

  constructor() { }

  ngOnInit() {
    this.displayedPlayedTiles = this.highestPlayedTiles(this.playedTiles);
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log('board: ngOnChanges called: changes = ', changes);

    if (typeof changes.playedTiles !== 'undefined' && changes.playedTiles.currentValue && !changes.playedTiles.firstChange) {
      this.displayedPlayedTiles = this.highestPlayedTiles(this.playedTiles);
    }

    if (this.guideShown === 'basic') {
      // Show guide after allowing the board to be rendered
      setTimeout(() => this.guideOptions = BASIC_GUIDE_OPTIONS, 50);
    }
    if (this.guideShown === 'none') {
      this.guideOptions = EMPTY_GUIDE_OPTIONS;
    }
  }

  onPlayerTileHintClicked($event) {
    this.playerTileHintClicked.emit($event);
  }

  onPartnerTileHintClicked($event) {
    this.partnerTileHintClicked.emit($event);
  }

  onPlayerTileClicked($event) {
    this.playerTileClicked.emit($event);
  }

  onPlayerTileLongPressed($event) {
    this.playerTileLongPressed.emit($event);
  }

  onPartnerTileClicked($event) {
    this.partnerTileClicked.emit($event);
  }

  onMenuButtonClicked() {
    this.menuButtonClicked.emit();
  }

  onGuideCancelButtonClicked() {
    this.guideCancelButtonClicked.emit();
  }
}
