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
      "colour": "yellow",
      "number": 2
    },
    {
      "colour": "green",
      "number": 3
    },
    {
      "colour": "blue",
      "number": 4
    },
    {
      "colour": "rainbow",
      "number": 5
    }
  ];
  discardedTiles:Tile[] = [
    {
      "colour": "white",
      "number": 1
    },
    {
      "colour": "yellow",
      "number": 1
    },
    {
      "colour": "yellow",
      "number": 1
    },
    {
      "colour": "green",
      "number": 3
    },
    {
      "colour": "rainbow",
      "number": 4
    },
    {
      "colour": "rainbow",
      "number": 2
    }
  ];
  playerTiles:Tile[] = [
    {
      "colour": null,
      "number": null
    },
    {
      "colour": null,
      "number": 2
    },
    {
      "colour": "red-ish",
      "number": null
    },
    {
      "colour": "green-ish",
      "number": 4
    },
    {
      "colour": "white-ish",
      "number": 5
    }
  ];
}
