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
  playerNames: string[] = ['PLAYER ONE', 'PLAYER TWO'];
  standardColours = ['white', 'red', 'yellow', 'green', 'blue'];
  rainbowColour = 'rainbow';
  colours = [...this.standardColours, this.rainbowColour];

  partnerHintNumberOptions;
  partnerHintColourOptions;
  gameState: GameState;

  constructor(private modalService: ModalService) { }

  allTiles() {
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

  shuffle(array) {
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

  generatePossibleHints(tiles: Tile[]): TileHint[] {
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

  getParamValueQueryString( paramName ) {
    const url = window.location.href;
    let paramValue;
    if (url.includes('?')) {
      const httpParams = new HttpParams({ fromString: url.split('?')[1] });
      paramValue = httpParams.get(paramName);
    }
    return paramValue;
  }

  initAndroidBrowserFullscreenHacks() {
    window.addEventListener('load', () => { window.scrollTo(0, 0); });

    // use this with care, only if you don't have overflow content to be scrolled.
    document.addEventListener('touchmove', e => { e.preventDefault(); });
  }

  ngOnInit() {
    this.initAndroidBrowserFullscreenHacks();

    this.setVhAccordingToWindowInnerHeight();

    // check if there is a serialized game state
    const serializedGameState = this.getParamValueQueryString('s');

    this.initGame(serializedGameState);
  }

  @HostListener('window:resize', [])
  setVhAccordingToWindowInnerHeight() {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    const vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  initGame(serializedGameState) {
    if (serializedGameState) {
      // Initialize from serialized game state
      const serializableGameState = SerializableGameState.deserialize(serializedGameState);
      this.gameState = SerializableGameState.toGameState(serializableGameState);

      this.logGameStateSerialized();
      this.logGameStateJson();
    } else {
      // Initialize new game
      this.gameState = GameState.newGame(this.shuffle(this.allTiles()));

      // Show main menu modal
      // Note: using setTimeout() to workaround an issue with openModal(..) failing during ngOnInit() call
      setTimeout(() => this.openModal('main-menu-modal'), 500);
    }
  }

  // Note: To call this method in the browser console: ng.probe($0).componentInstance.logGameStateSerialized()
  logGameStateSerialized() {
    console.log('--- gameState serialized START ---');
    console.log(SerializableGameState.fromGameState(this.gameState).serialize());
    console.log('--- gameState serialized END ---');
  }

  // Note: To call this method in the browser console: ng.probe($0).componentInstance.logGameStateJson()
  logGameStateJson() {
    console.log('--- gameState JSON START ---');
    console.log(JSON.stringify(SerializableGameState.fromGameState(this.gameState).toJson()));
    console.log('--- gameState JSON END ---');
  }

  highestPlayedTiles(playedTiles): Tile[] {
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
    const highestPlayed = this.highestPlayedTiles(this.gameState.playedTiles);
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
    const matchingTiles = this.gameState.discardedTiles.filter(t => {
      return (t.colour === lastDiscardTile.colour && t.number === lastDiscardTile.number);
    });
    return (matchingTiles.length === 3 && lastDiscardTile.number === 1) ||
           (matchingTiles.length === 2 && (lastDiscardTile.number === 2 || lastDiscardTile.number === 3 || lastDiscardTile.number === 4)) ||
           (matchingTiles.length === 1 && lastDiscardTile.number === 5);
  }

  areAllPlayedStacksComplete(): boolean {
    return this.highestPlayedTiles(this.gameState.playedTiles).filter(t => t.number === 5).length === 6;
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  onStartButtonClicked($event) {
    this.playerNames = $event;

    // Show player ready modal
    this.openModal('player-ready-modal');
  }

  showEndOfTurnModal() {
    // Unset chosen stuff
    this.gameState.isPartnerTilesChosen = false;

    // Show end of turn modal
    this.openModal('end-of-turn-modal');
  }

  onPlayerReadyButtonClicked() {
    // Prepare for next player's turn
    // -- swap player & partner tiles
    this.gameState.hands.switchPlayer();

    // -- swap player & partner tile hint
    const tempTileHint = this.gameState.playerTileHintChosen;
    this.gameState.playerTileHintChosen = this.gameState.partnerTileHintChosen;
    this.gameState.partnerTileHintChosen = tempTileHint;

    // Close player ready modal
    this.closeModal('player-ready-modal');

    // Is game over?
    if (this.gameState.isGameOver) {
      // Start new game
      this.initGame(null);
    } else {
      this.gameState.isHideBoard = false;
      if (this.gameState.turnInfo.isNotEmpty()) {
        this.openModal('start-of-turn-modal');
      }
    }
  }

  onEndOfTurnButtonClicked() {
    // Prepare for next player's turn
    // -- set current player & waiting player
    this.gameState.currentPlayer = (this.gameState.currentPlayer + 1) % 2;
    this.gameState.waitingPlayer = (this.gameState.waitingPlayer + 1) % 2;

    // Hide board
    this.gameState.isHideBoard = true;

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

  onPartnerTileHintClicked() {
    this.gameState.isShowPartnerHints = !this.gameState.isShowPartnerHints;
  }

  onPlayerTileHintClicked() {
    this.gameState.isShowPlayerHints = !this.gameState.isShowPlayerHints;
  }

  onPartnerTileClicked() {
    this.gameState.isPartnerTilesChosen = true;

    // Clear chosen tile & hint
    this.gameState.chosenTile = null;
    this.gameState.playerTileHintChosen = TileHint.noHint();

    // Determine available colour hints
    this.partnerHintColourOptions = this.gameState.hands.getPartnerHintColourOptions();

    // Determine available number hints
    this.partnerHintNumberOptions = this.gameState.hands.getPartnerHintNumberOptions();

    this.openModal('partner-tile-modal');
  }

  onColourHintButtonClicked(colour: string) {
    // Apply colour hint
    this.gameState.partnerTileHintChosen = TileHint.colourHint(colour);
    this.gameState.hands.applyPartnerHint(this.gameState.partnerTileHintChosen);

    // Remove info token
    this.gameState.infoTokens--;

    // Update turn info
    this.gameState.turnInfo = TurnInfo.hint(TileHint.colourHint(colour));
    this.gameState.turnInfoText = '';

    // Close partner tile modal
    this.closeModal('partner-tile-modal');

    // Show end of turn modal
    this.showEndOfTurnModal();
  }

  onNumberHintButtonClicked(chosenNumber: number) {
    // Apply number hint
    this.gameState.partnerTileHintChosen = TileHint.numberHint(chosenNumber);
    this.gameState.hands.applyPartnerHint(this.gameState.partnerTileHintChosen);

    // Remove info token
    this.gameState.infoTokens--;

    // Update turn info
    this.gameState.turnInfo = TurnInfo.hint(TileHint.numberHint(chosenNumber));
    this.gameState.turnInfoText = '';

    // Close partner tile modal
    this.closeModal('partner-tile-modal');

    // Show end of turn modal
    this.showEndOfTurnModal();
  }

  onPartnerTileModalCancelled() {
    // Unset partner chosen tiles
    this.gameState.isPartnerTilesChosen = false;
  }

  onPlayerTileClicked($event) {
    this.gameState.chosenTile = $event;

    // Clear chosen hint
    this.gameState.playerTileHintChosen = TileHint.noHint();

    this.openModal('player-tile-modal');
  }

  onPlayTileButtonClicked() {
    // Remove chosen tile from player tiles
    this.gameState.hands.removePlayerTile(this.gameState.chosenTile);

    // Update turn info
    this.gameState.turnInfo = TurnInfo.played(this.gameState.chosenTile);
    this.gameState.turnInfoText = '';

    // Tile is playable?
    if (this.isTilePlayable(this.gameState.chosenTile)) {
      // - Add chosen tile to played tiles
      this.gameState.playedTiles = this.gameState.playedTiles.concat(this.gameState.chosenTile);
      // - Is five played?
      if (this.gameState.chosenTile.number === 5) {
        // - Is game won
        if (this.areAllPlayedStacksComplete()) {
          // Game won
          this.gameState.isGameOver = true;
          this.gameState.isGameWon = true;
          this.gameState.gameOverHeading = 'GAME WON!';
          this.gameState.turnInfoText = 'All stacks complete';
        } else {
          // Add info token
          if (this.gameState.infoTokens < 8) {
            this.gameState.infoTokens++;
            this.gameState.turnInfo = TurnInfo.playedAndEarnedInfoToken(this.gameState.chosenTile);
          }
        }
      }
    } else {
      // Tile is not playable?
      // - Add chosen tile to discarded tiles
      this.gameState.discardedTiles = this.gameState.discardedTiles.concat(this.gameState.chosenTile);
      // - Remove fuse token
      this.gameState.fuseTokens--;
      this.gameState.turnInfo = TurnInfo.playedAndLostFuseToken(this.gameState.chosenTile);
      // - Is game over due to no more fuse tokens?
      if (this.gameState.fuseTokens === 0) {
        // - Game Over
        this.gameState.isGameOver = true;
        this.gameState.gameOverHeading = 'GAME OVER';
        // - Update turn info
        this.gameState.turnInfoText = 'All fuse tokens lost';
      // Is game over due to all matching tiles discarded?
      } else if (this.areAllMatchingTilesDiscarded(this.gameState.chosenTile)) {
        this.gameState.isGameOver = true;
        this.gameState.gameOverHeading = 'GAME OVER';
        // Update turn info
        this.gameState.turnInfoText = `Last ${this.gameState.chosenTile.colour} ${this.gameState.chosenTile.number} discarded`;
      }
    }

    // Add new tile to player tiles from remainingTiles
    if (this.gameState.remainingTiles.length > 0) {
      const newTile: Tile = this.gameState.remainingTiles.splice(0, 1)[0];
      this.gameState.hands.addPlayerTile(newTile);
    }

    // Close player tile modal
    this.closeModal('player-tile-modal');

    // Show end of turn modal
    this.showEndOfTurnModal();
  }

  onPlayerTileModalCancelled() {
    // Unset chosen tile
    this.gameState.chosenTile = null;
  }

  onDiscardTileButtonClicked() {
    // Remove chosen tile from player tiles
    this.gameState.hands.removePlayerTile(this.gameState.chosenTile);

    // Add info token
    this.gameState.infoTokens++;

    // Update turn info
    this.gameState.turnInfo = TurnInfo.discarded(this.gameState.chosenTile);
    this.gameState.turnInfoText = '';

    // Add chosen tile to discarded tiles
    this.gameState.discardedTiles = this.gameState.discardedTiles.concat(this.gameState.chosenTile);

    // Is game over?
    if (this.areAllMatchingTilesDiscarded(this.gameState.chosenTile)) {
      this.gameState.isGameOver = true;
      this.gameState.gameOverHeading = 'GAME OVER';
      // Update turn info
      this.gameState.turnInfoText = `Last ${this.gameState.chosenTile.colour} ${this.gameState.chosenTile.number} discarded`;
    }

    // Add new tile to player tiles from remainingTiles
    if (this.gameState.remainingTiles.length > 0) {
      const newTile: Tile = this.gameState.remainingTiles.splice(0, 1)[0];
      this.gameState.hands.addPlayerTile(newTile);
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

    this.initGame(null);
  }

  onQuitGameNoButtonClicked() {
    this.closeModal('quit-game-modal');
  }
}
