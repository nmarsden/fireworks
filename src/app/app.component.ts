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
  playerNames: string[] = ['P1', "P2"];
  standardColours = ["white", "red", "yellow", "green", "blue"];
  rainbowColour = 'rainbow';
  colours = [...this.standardColours, this.rainbowColour];
  isOnInitAlreadyCalled = false;

  currentPlayer: number;
  waitingPlayer: number;
  turnInfo: string;
  remainingTiles: Tile[];
  playerTiles: Tile[];
  partnerTiles: Tile[];
  playedTiles: Tile[];
  discardedTiles: Tile[];
  infoTokens: number;
  fuseTokens: number;
  chosenTile: Tile;
  isShowPartnerHints: boolean = false;
  isShowPlayerHints: boolean = false;
  isPartnerTilesChosen: boolean;
  partnerTileHintChosen: TileHint = TileHint.noHint();
  playerTileHintChosen: TileHint = TileHint.noHint();
  partnerHintColourOptions: string[];
  partnerHintNumberOptions: number[];
  isGameOver: boolean;
  isHideBoard: boolean = true;
  gameOverHeading: string;

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
    this.newGame();
    this.isOnInitAlreadyCalled = true;
  }

  newGame() {
    this.currentPlayer = 0;
    this.waitingPlayer = 1;
    this.turnInfo = "Starting a new game";
    this.remainingTiles = [];
    this.playerTiles = [];
    this.partnerTiles = [];
    this.playedTiles = [];
    this.discardedTiles = [];
    this.infoTokens = 8;
    this.fuseTokens = 3;
    this.isGameOver = false;
    this.isHideBoard = true;

    // Get all tiles
    let tiles = this.allTiles();

    // Shuffle tiles
    this.remainingTiles = this.shuffle(tiles);

    // Deal
    this.partnerTiles = this.remainingTiles.splice(0, 5);
    this.playerTiles = this.remainingTiles.splice(0, 5);

    // Generate possible player hints
    // let possiblePlayerHints = this.generatePossibleHints(this.playerTiles);
    //
    // // Pick 3 random hints
    // let pickedHints = this.shuffle(possiblePlayerHints).slice(0, 3);
    //
    // // Apply hints
    // pickedHints.forEach(hint => {
    //   this.playerTiles.forEach((t, i) => {
    //     t.applyHint(hint);
    //   })
    // });

    // Show main menu modal
    // Note: checking isOnInitCalled to workaround an issue with openModal(..) failing during ngOnInit() call
    if (this.isOnInitAlreadyCalled) {
      this.openModal('main-menu-modal');
    }
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

  areAllMatchingTilesDiscarded(lastDiscardTile: Tile): boolean {
    // Does discarded tiles now include ALL the tiles matching the last discarded tile?
    let matchingTiles = this.discardedTiles.filter(t => (t.colour === lastDiscardTile.colour && t.number === lastDiscardTile.number));
    return (matchingTiles.length === 3 && lastDiscardTile.number === 1) ||
           (matchingTiles.length === 2 && (lastDiscardTile.number === 2 || lastDiscardTile.number === 3 || lastDiscardTile.number === 4)) ||
           (matchingTiles.length === 1 && lastDiscardTile.number === 5);
  }

  areAllPlayedStacksComplete(): boolean {
    return this.highestPlayedTiles(this.playedTiles).filter(t => t.number === 5).length === 6;
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  onStartButtonClicked() {
    // Close main menu modal
    this.closeModal('main-menu-modal');

    // Show player ready modal
    this.openModal('player-ready-modal');
  }

  showEndOfTurnModal() {
    // Unset chosen stuff
    this.isPartnerTilesChosen = false;

    // Show end of turn modal
    this.openModal('end-of-turn-modal');
  }

  onPlayerReadyButtonClicked() {
    // Prepare for next player's turn
    // -- swap player & partner tiles
    let tempTiles = this.playerTiles;
    this.playerTiles = this.partnerTiles.reverse();
    this.partnerTiles = tempTiles.reverse();
    // -- swap player & partner tile hint
    let tempTileHint = this.playerTileHintChosen;
    this.playerTileHintChosen = this.partnerTileHintChosen;
    this.partnerTileHintChosen = tempTileHint;

    // Close player ready modal
    this.closeModal('player-ready-modal');

    // Is game over?
    if (this.isGameOver) {
      // Start new game
      this.newGame();
    } else {
      this.isHideBoard = false;
    }
  }

  onEndOfTurnButtonClicked() {
    // Prepare for next player's turn
    // -- set current player & waiting player
    this.currentPlayer = (this.currentPlayer+1) % 2;
    this.waitingPlayer = (this.waitingPlayer+1) % 2;

    // Close end of turn modal
    this.closeModal('end-of-turn-modal');

    // Show player ready modal
    this.openModal('player-ready-modal');
  }

  onEndOfTurnModalCancelled() {
    this.onEndOfTurnButtonClicked();
  }

  onPartnerTileHintClicked($event) {
    this.isShowPartnerHints = !this.isShowPartnerHints;
  }

  onPlayerTileHintClicked($event) {
    this.isShowPlayerHints = !this.isShowPlayerHints;
  }

  onPartnerTileClicked($event) {
    this.isPartnerTilesChosen = true;

    // Clear chosen tile & hint
    this.chosenTile = null;
    this.playerTileHintChosen = TileHint.noHint();

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
    this.partnerTileHintChosen = TileHint.colourHint(colour);
    this.partnerTiles.forEach(t => t.applyHint(this.partnerTileHintChosen));

    // Remove info token
    this.infoTokens--;

    // Update turn info
    this.turnInfo = `${this.playerNames[this.currentPlayer]} hinted about ${colour}`;

    // Close partner tile modal
    this.closeModal('partner-tile-modal');

    // Show end of turn modal
    this.showEndOfTurnModal();
  }

  onNumberHintButtonClicked(number: number) {
    // Apply number hint
    this.partnerTileHintChosen = TileHint.numberHint(number);
    this.partnerTiles.forEach(t => t.applyHint(this.partnerTileHintChosen));

    // Remove info token
    this.infoTokens--;

    // Update turn info
    this.turnInfo = `${this.playerNames[this.currentPlayer]} hinted about ${number}`;

    // Close partner tile modal
    this.closeModal('partner-tile-modal');

    // Show end of turn modal
    this.showEndOfTurnModal();
  }

  onPartnerTileModalCancelled() {
    // Unset partner chosen tiles
    this.isPartnerTilesChosen = false;
  }

  onPlayerTileClicked($event) {
    this.chosenTile = $event;

    // Clear chosen hint
    this.playerTileHintChosen = TileHint.noHint();

    this.openModal('player-tile-modal');
  }

  onPlayTileButtonClicked() {
    // Remove chosen tile from player tiles
    this.playerTiles = this.playerTiles.filter(t => t.id !== this.chosenTile.id);

    // Update turn info
    this.turnInfo = `${this.playerNames[this.currentPlayer]} played a ${this.chosenTile.colour} ${this.chosenTile.number}`;

    // Tile is playable?
    if (this.isTilePlayable(this.chosenTile)) {
      // - Add chosen tile to played tiles
      this.playedTiles = this.playedTiles.concat(this.chosenTile);
      // - Is five played?
      if (this.chosenTile.number === 5) {
        this.turnInfo = `${this.playerNames[this.currentPlayer]} completed the ${this.chosenTile.colour} stack`;
        // - Is game won
        if (this.areAllPlayedStacksComplete()) {
          // Game won
          this.isGameOver = true;
          this.gameOverHeading = "GAME WON!";
          this.turnInfo = this.turnInfo + '. All stacks complete'
        } else {
          // Add info token
          if (this.infoTokens < 8) {
            this.infoTokens++;
            this.turnInfo = this.turnInfo + '. Hint token earned'
          }
        }
      }
    } else {
      // Tile is not playable?
      // - Add chosen tile to discarded tiles
      this.discardedTiles = this.discardedTiles.concat(this.chosenTile);
      // - Remove fuse token
      this.fuseTokens--;
      // - Is game over due to no more fuse tokens?
      if (this.fuseTokens === 0) {
        // - Game Over
        this.isGameOver = true;
        this.gameOverHeading = "GAME OVER";
        // - Update turn info
        this.turnInfo = this.turnInfo + ` which is unplayable. Last fuse token used`;
      // Is game over due to all matching tiles discarded?
      } else if (this.areAllMatchingTilesDiscarded(this.chosenTile)) {
        this.isGameOver = true;
        this.gameOverHeading = "GAME OVER";
        // Update turn info
        this.turnInfo = `${this.playerNames[this.currentPlayer]} discarded the last ${this.chosenTile.colour} ${this.chosenTile.number}`;
      } else {
        // - Continue Game
        // - Update turn info
        this.turnInfo = this.turnInfo + ` which is unplayable. Fuse tokens reduced`;
      }
    }

    // Add new tile to player tiles from remainingTiles
    if (this.remainingTiles.length > 0) {
      this.playerTiles.push(...this.remainingTiles.splice(0, 1));
    }

    // Close player tile modal
    this.closeModal('player-tile-modal');

    // Show end of turn modal
    this.showEndOfTurnModal();
  }

  onPlayerTileModalCancelled() {
    // Unset chosen tile
    this.chosenTile = null;
  }

  onDiscardTileButtonClicked() {
    // Remove chosen tile from player tiles
    this.playerTiles = this.playerTiles.filter(t => t.id !== this.chosenTile.id);

    // Add info token
    this.infoTokens++;

    // Update turn info
    this.turnInfo = `${this.playerNames[this.currentPlayer]} discarded a ${this.chosenTile.colour} ${this.chosenTile.number}`;

    // Add chosen tile to discarded tiles
    this.discardedTiles = this.discardedTiles.concat(this.chosenTile);

    // Is game over?
    if (this.areAllMatchingTilesDiscarded(this.chosenTile)) {
      this.isGameOver = true;
      this.gameOverHeading = "GAME OVER";
      // Update turn info
      this.turnInfo = `${this.playerNames[this.currentPlayer]} discarded the last ${this.chosenTile.colour} ${this.chosenTile.number}`;
    }

    // Add new tile to player tiles from remainingTiles
    if (this.remainingTiles.length > 0) {
      this.playerTiles.push(...this.remainingTiles.splice(0, 1));
    }

    // Close player tile modal
    this.closeModal('player-tile-modal');

    // Show end of turn modal
    this.showEndOfTurnModal();
  }

  onDeckClicked() {
    this.openModal('quit-game-modal');
  }

  onQuitGameYesButtonClicked() {
    this.closeModal('quit-game-modal');

    this.newGame();
  }

  onQuitGameNoButtonClicked() {
    this.closeModal('quit-game-modal');
  }
}
