import { Component } from '@angular/core';
import { Tile } from './tile';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'fireworks';

  partnerTiles:Tile[] = [
    {
      "colour": "red",
      "number": 1
    },
    {
      "colour": "blue",
      "number": 2
    },
    {
      "colour": "yellow",
      "number": 3
    },
    {
      "colour": "white",
      "number": 4
    },
    {
      "colour": "rainbow",
      "number": 5
    }
  ];
  playedTiles:Tile[] = [
    {
      "colour": null,
      "number": null
    },
    {
      "colour": "red",
      "number": 1
    },
    {
      "colour": "blue",
      "number": 2
    },
    {
      "colour": "yellow",
      "number": 3
    },
    {
      "colour": "green",
      "number": 4
    },
    {
      "colour": "rainbow",
      "number": 5
    }
  ];
  playerTiles:Tile[] = [
    {
      "colour": "red",
      "number": 1
    },
    {
      "colour": "blue",
      "number": 2
    },
    {
      "colour": "yellow",
      "number": 3
    },
    {
      "colour": "green",
      "number": 4
    },
    {
      "colour": "rainbow",
      "number": 5
    }
  ];
}
