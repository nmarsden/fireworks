import { Component, HostListener, OnInit } from '@angular/core';
import { Tile } from './tile';
import { TileHint } from './tile-hint';
import { ModalService } from './modal.service';
import { TurnInfo } from './turn-info';
import { HttpParams } from '@angular/common/http';
import { GameState } from './game-state';
import { SerializableGameState } from './core/state/serializable/serializable-game-state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'fireworks';
  playerNames: string[] = ['P1', 'P2'];
  standardColours = ['white', 'red', 'yellow', 'green', 'blue'];
  rainbowColour = 'rainbow';
  colours = [...this.standardColours, this.rainbowColour];
  isOnInitAlreadyCalled = false;

  currentPlayer: number;
  waitingPlayer: number;
  turnInfoText: string;
  turnInfo: TurnInfo = TurnInfo.empty();
  remainingTiles: Tile[];
  playerTiles: Tile[];
  partnerTiles: Tile[];
  playedTiles: Tile[];
  discardedTiles: Tile[];
  infoTokens: number;
  fuseTokens: number;
  chosenTile: Tile;
  isShowPartnerHints = false;
  isShowPlayerHints = false;
  isPartnerTilesChosen: boolean;
  partnerTileHintChosen: TileHint = TileHint.noHint();
  playerTileHintChosen: TileHint = TileHint.noHint();
  partnerHintColourOptions: string[];
  partnerHintNumberOptions: number[];
  isGameOver: boolean;
  isGameWon: boolean;
  isHideBoard = true;
  gameOverHeading: string;

  constructor(private modalService: ModalService) { }

  allTiles = () => {
    let tiles = [];
    for (let i = 1; i <= 5; i++) {
      tiles = tiles.concat(this.colours.map(colour => new Tile(colour, i)));
      if (i <= 4) {
        tiles = tiles.concat(this.colours.map(colour => new Tile(colour, i)));
      }
      if (i === 1) {
        tiles = tiles.concat(this.colours.map(colour => new Tile(colour, i)));
      }
    }
    return tiles;
  }

  shuffle = (array) => {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

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
  }

  isRandomTrue = () => {
    return Math.random() > 0.5;
  }

  generatePossibleHints = (tiles: Tile[]): TileHint[] => {
      const colours = new Set(tiles.map(t => t.colour));
      const numbers = new Set(tiles.map(t => t.number));
      let hints: TileHint[] = [];
      if (colours.has('rainbow')) {
        hints = this.standardColours.map(c => TileHint.colourHint(c));
      } else {
        colours.forEach(c => { hints.push(TileHint.colourHint(c)); });
      }
      numbers.forEach(n => { hints.push(TileHint.numberHint(n)); });
      return hints;
  }

  getParamValueQueryString = ( paramName ) => {
    const url = window.location.href;
    let paramValue;
    if (url.includes('?')) {
      const httpParams = new HttpParams({ fromString: url.split('?')[1] });
      paramValue = httpParams.get(paramName);
    }
    return paramValue;
  }

  ngOnInit() {
    this.setVhAccordingToWindowInnerHeight();

    // TODO check if loading a given state
    const serializedGameState = this.getParamValueQueryString('s');
    if (serializedGameState) {

      const serializableGameState = SerializableGameState.deserialize(serializedGameState);
      const gameState = SerializableGameState.toGameState(serializableGameState);
      // console.warn(`gameState ${gameState.asString()}`);
    }

    this.newGame();
    this.isOnInitAlreadyCalled = true;
  }

  @HostListener('window:resize', [])
  setVhAccordingToWindowInnerHeight() {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    const vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  newGame() {
    this.currentPlayer = 0;
    this.waitingPlayer = 1;
    this.turnInfoText = 'Starting a new game';
    this.turnInfo = TurnInfo.empty();
    this.remainingTiles = [];
    this.playerTiles = [];
    this.partnerTiles = [];
    this.playedTiles = [];
    this.discardedTiles = [];
    this.infoTokens = 8;
    this.fuseTokens = 3;
    this.isGameOver = false;
    this.isGameWon = false;
    this.isHideBoard = true;

    // Get all tiles
    const tiles = this.allTiles();

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

  highestPlayedTiles = (playedTiles): Tile[] => {
    const highestColourNumber = {};
    this.colours.forEach(c => highestColourNumber[c] = null);
    playedTiles.forEach(t => {
      if (t.number > highestColourNumber[t.colour]) {
        highestColourNumber[t.colour] = t.number;
      }
    });
    return this.colours.map(c => new Tile(c, highestColourNumber[c]));
  }

  private isTilePlayable(tile: Tile) {
    const highestPlayed = this.highestPlayedTiles(this.playedTiles);
    const highestPlayedForColour = highestPlayed.filter(t => t.colour === tile.colour);
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
    const matchingTiles = this.discardedTiles.filter(t => (t.colour === lastDiscardTile.colour && t.number === lastDiscardTile.number));
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
    const tempTiles = this.playerTiles;
    this.playerTiles = this.partnerTiles.reverse();
    this.partnerTiles = tempTiles.reverse();
    // -- swap player & partner tile hint
    const tempTileHint = this.playerTileHintChosen;
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
      if (this.turnInfo.isNotEmpty()) {
        this.openModal('start-of-turn-modal');
      }
    }
  }

  onEndOfTurnButtonClicked() {
    // Prepare for next player's turn
    // -- set current player & waiting player
    this.currentPlayer = (this.currentPlayer + 1) % 2;
    this.waitingPlayer = (this.waitingPlayer + 1) % 2;

    // Hide board
    this.isHideBoard = true;

    // Close end of turn modal
    this.closeModal('end-of-turn-modal');

    // Show player ready modal
    this.openModal('player-ready-modal');
  }

  onStartOfTurnModalCancelled() {
    // Prepare to start turn
    this.closeModal('start-of-turn-modal');
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
    this.partnerHintColourOptions.sort((c1, c2) => this.standardColours.indexOf(c1) > this.standardColours.indexOf(c2) ? 1 : -1);
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
    this.turnInfo = TurnInfo.hint(TileHint.colourHint(colour));
    this.turnInfoText = '';

    // Close partner tile modal
    this.closeModal('partner-tile-modal');

    // Show end of turn modal
    this.showEndOfTurnModal();
  }

  onNumberHintButtonClicked(chosenNumber: number) {
    // Apply number hint
    this.partnerTileHintChosen = TileHint.numberHint(chosenNumber);
    this.partnerTiles.forEach(t => t.applyHint(this.partnerTileHintChosen));

    // Remove info token
    this.infoTokens--;

    // Update turn info
    this.turnInfo = TurnInfo.hint(TileHint.numberHint(chosenNumber));
    this.turnInfoText = '';

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
    this.turnInfo = TurnInfo.played(this.chosenTile);
    this.turnInfoText = '';

    // Tile is playable?
    if (this.isTilePlayable(this.chosenTile)) {
      // - Add chosen tile to played tiles
      this.playedTiles = this.playedTiles.concat(this.chosenTile);
      // - Is five played?
      if (this.chosenTile.number === 5) {
        // - Is game won
        if (this.areAllPlayedStacksComplete()) {
          // Game won
          this.isGameOver = true;
          this.isGameWon = true;
          this.gameOverHeading = 'GAME WON!';
          this.turnInfoText = 'All stacks complete';
        } else {
          // Add info token
          if (this.infoTokens < 8) {
            this.infoTokens++;
            this.turnInfo = TurnInfo.playedAndEarnedInfoToken(this.chosenTile);
          }
        }
      }
    } else {
      // Tile is not playable?
      // - Add chosen tile to discarded tiles
      this.discardedTiles = this.discardedTiles.concat(this.chosenTile);
      // - Remove fuse token
      this.fuseTokens--;
      this.turnInfo = TurnInfo.playedAndLostFuseToken(this.chosenTile);
      // - Is game over due to no more fuse tokens?
      if (this.fuseTokens === 0) {
        // - Game Over
        this.isGameOver = true;
        this.gameOverHeading = 'GAME OVER';
        // - Update turn info
        this.turnInfoText = 'All fuse tokens lost';
      // Is game over due to all matching tiles discarded?
      } else if (this.areAllMatchingTilesDiscarded(this.chosenTile)) {
        this.isGameOver = true;
        this.gameOverHeading = 'GAME OVER';
        // Update turn info
        this.turnInfoText = `${this.playerNames[this.currentPlayer]} discarded the last ` +
                            `${this.chosenTile.colour} ${this.chosenTile.number}`;
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
    this.turnInfo = TurnInfo.discarded(this.chosenTile);
    this.turnInfoText = '';

    // Add chosen tile to discarded tiles
    this.discardedTiles = this.discardedTiles.concat(this.chosenTile);

    // Is game over?
    if (this.areAllMatchingTilesDiscarded(this.chosenTile)) {
      this.isGameOver = true;
      this.gameOverHeading = 'GAME OVER';
      // Update turn info
      this.turnInfoText = `${this.playerNames[this.currentPlayer]} discarded the last ${this.chosenTile.colour} ${this.chosenTile.number}`;
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
