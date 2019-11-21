export class Guid {

  constructor(public guid: string) {
    this.guid = guid;
  }

  static create(): Guid {
    return new Guid('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      /* tslint:disable:no-bitwise */
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      /* tslint:enable:no-bitwise */
      return v.toString(16);
    }));
  }
}
