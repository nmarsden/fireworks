import { TileMark } from '../../../tile-mark';

const allColours: string[] = ['white', 'red', 'yellow', 'green', 'blue', 'rainbow'];
const colourToCode = colour => (colour === 'rainbow') ? 'x' : colour[0];
const codeToColourMap: Map<string, string> = new Map(allColours.map(colour => [colourToCode(colour), colour]));
const codeToColour = code => codeToColourMap.get(code);

const allTileMarkKeys: string[] = Object.keys(TileMark);
const tileMarkToCode = (tileMark: TileMark): string => tileMark[0];
const codeToTileMarkMap: Map<string, TileMark> = new Map(allTileMarkKeys.map(
  tileMarkKey => [tileMarkToCode(TileMark[tileMarkKey]), TileMark[tileMarkKey]]));
const codeToTileMark = (code: string): TileMark => codeToTileMarkMap.get(code);

export class SerializableHelpers {

  static onDeserializeColour(code) {
    return (typeof code !== 'undefined' ? codeToColour(code) : undefined);
  }

  static onSerializeColour(colour) {
    return (typeof colour !== 'undefined' ? colourToCode(colour) : undefined);
  }

  static onDeserializeColours(aString: string): string[] {
    if (typeof aString === 'undefined') {
      return undefined;
    }
    return [...aString].map(codeToColour);
  }

  static onSerializeColours(array: string[]): string {
    if (typeof array === 'undefined') {
      return undefined;
    }
    return array.map(colourToCode).join('');
  }

  static onDeserializeNumbers(aString: string): number[] {
    if (typeof aString === 'undefined') {
      return undefined;
    }
    return [...aString].map(char => Number.parseInt(char, 10));
  }

  static onSerializeNumbers(array: number[]): string {
    if (typeof array === 'undefined') {
      return undefined;
    }
    return array.map(String).join('');
  }

  static onDeserializeTileMarks(aString: string): TileMark[] {
    if (typeof aString === 'undefined') {
      return undefined;
    }
    return [...aString].map(codeToTileMark);
  }

  static onSerializeTileMarks(array: TileMark[]): string {
    if (typeof array === 'undefined') {
      return undefined;
    }
    return array.map(tileMarkToCode).join('');
  }
}
