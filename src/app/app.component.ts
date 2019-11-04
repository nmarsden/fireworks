import { Component } from '@angular/core';
import { Tile } from './tile';
import { TileHint } from './tile-hint';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'fireworks';

  remainingTiles:Tile[] = [];
  playerTiles:Tile[] = [];
  partnerTiles:Tile[] = [];
  playedTiles:Tile[] = [];
  discardedTiles:Tile[] = [];
  chosenTile: Tile;
  partnerHintColourOptions: string[];
  partnerHintNumberOptions: number[];

  standardColours = ["white", "red", "yellow", "green", "blue"];
  rainbowColour = 'rainbow';
  colours = [...this.standardColours, this.rainbowColour];

  constructor(private modalService: ModalService) { }

  allTiles = () => {
    let tiles = [];
    for (let i=1; i<=5; i++) {
      tiles = tiles.concat(this.colours.map(colour => new Tile(colour, i)));
      if (i <= 4) {
        tiles = tiles.concat(this.colours.map(colour => new Tile(colour, i)));
      }
      if (i === 1) {
        tiles = tiles.concat(this.colours.map(colour => new Tile(colour, i)));
      }
    }
    return tiles;
  };

  shuffle = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  isRandomTrue = () => {
    return Math.random() > 0.5;
  };

  generatePossibleHints = (tiles: Tile[]): TileHint[] => {
      let colours = new Set(tiles.map(t => t.colour));
      let numbers = new Set(tiles.map(t => t.number));
      let hints:TileHint[] = [];
      if (colours.has('rainbow')) {
        hints = this.standardColours.map(c => TileHint.colourHint(c));
      } else {
        colours.forEach(c => { hints.push(TileHint.colourHint(c)) });
      }
      numbers.forEach(n => { hints.push(TileHint.numberHint(n)) });
      return hints;
  };

  ngOnInit() {
    // Get all tiles
    let tiles = this.allTiles();

    // Shuffle tiles
    this.remainingTiles = this.shuffle(tiles);

    // Deal
    this.partnerTiles = this.remainingTiles.splice(0, 5);
    this.playerTiles = this.remainingTiles.splice(0, 5);

    // Generate possible player hints
    let possiblePlayerHints = this.generatePossibleHints(this.playerTiles);

    // Pick 3 random hints
    let pickedHints = this.shuffle(possiblePlayerHints).slice(0, 3);

    // Apply hints
    pickedHints.forEach(hint => {
      this.playerTiles.forEach((t, i) => {
        t.applyHint(hint);
      })
    });
  }

  highestPlayedTiles = (playedTiles):Tile[] => {
    let highestColourNumber = {};
    this.colours.forEach(c => highestColourNumber[c] = null);
    playedTiles.forEach(t => {
      if (t.number > highestColourNumber[t.colour]) {
        highestColourNumber[t.colour] = t.number;
      }
    });
    return this.colours.map(c => new Tile(c, highestColourNumber[c]));
  };

  private isTilePlayable(tile: Tile) {
    let highestPlayed = this.highestPlayedTiles(this.playedTiles);
    let highestPlayedForColour = highestPlayed.filter(t => t.colour === tile.colour);
    let playableNumber;
    if (highestPlayedForColour.length === 0) {
      playableNumber = 1;
    } else {
      playableNumber = highestPlayedForColour[0].number + 1;
    }
    return (tile.number === playableNumber);
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  onPartnerTileClicked($event) {
    this.chosenTile = $event;

    // Determine available colour hints
    if (this.partnerTiles.some(t => t.colour === this.rainbowColour)) {
      this.partnerHintColourOptions = [...this.standardColours];
    } else {
      this.partnerHintColourOptions = [...new Set(this.partnerTiles.map(t => t.colour))];
    }
    this.partnerHintColourOptions.sort((c1, c2) => { return this.standardColours.indexOf(c1) > this.standardColours.indexOf(c2) ? 1 : -1 });
    // Determine available number hints
    this.partnerHintNumberOptions = [...new Set(this.partnerTiles.map(t => t.number))].sort();

    this.openModal('partner-tile-modal');
  }

  onColourHintButtonClicked(colour: string) {
    // Apply colour hint
    let hint = TileHint.colourHint(colour);
    this.partnerTiles.forEach(t => t.applyHint(hint));

    // Close partner tile modal
    this.closeModal('partner-tile-modal');
  }

  onNumberHintButtonClicked(number: number) {
    // Apply number hint
    let hint = TileHint.numberHint(number);
    this.partnerTiles.forEach(t => t.applyHint(hint));

    // Close partner tile modal
    this.closeModal('partner-tile-modal');
  }

  onPlayerTileClicked($event) {
    this.chosenTile = $event;
    this.openModal('player-tile-modal');
  }

  onPlayTileButtonClicked() {
    // Remove chosen tile from player tiles
    this.playerTiles = this.playerTiles.filter(t => t.id !== this.chosenTile.id);

    // Tile is playable?
    if (this.isTilePlayable(this.chosenTile)) {
      // - Add chosen tile to played tiles
      this.playedTiles = this.playedTiles.concat(this.chosenTile);
      // console.log('playedTiles = ', this.playedTiles.map(t => t.toString()));
    } else {
      // Tile is not playable?
      // - Add chosen tile to discarded tiles
      this.discardedTiles = this.discardedTiles.concat(this.chosenTile);
      // console.log('discardedTiles = ', this.discardedTiles.map(t => t.toString()));
      // - TODO Perform BOOM!
      console.log('BOOM! Chosen tile is not playable. ', this.chosenTile.toString());
    }

    // Add new tile to player tiles from remainingTiles
    this.playerTiles.push(...this.remainingTiles.splice(0, 1));

    // Close player tile modal
    this.closeModal('player-tile-modal');
  }

  onDiscardTileButtonClicked() {
    // Remove chosen tile from player tiles
    this.playerTiles = this.playerTiles.filter(t => t.id !== this.chosenTile.id);

    // Add chosen tile to discarded tiles
    this.discardedTiles = this.discardedTiles.concat(this.chosenTile);

    // Add new tile to player tiles from remainingTiles
    this.playerTiles.push(...this.remainingTiles.splice(0, 1));

    // Close player tile modal
    this.closeModal('player-tile-modal');
  }
}
