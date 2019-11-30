import { ArrayUtils } from './array-utils';

describe('ArrayUtils', () => {

  describe('compareArrays', () => {

    describe('should return true', () => {
      it('when arrays are both empty', () => {
        const a1 = [];
        const a2 = [];
        expect(ArrayUtils.compareArrays(a1, a2)).toBeTruthy();
      });

      it('when arrays are both null', () => {
        const a1 = null;
        const a2 = null;
        expect(ArrayUtils.compareArrays(a1, a2)).toBeTruthy();
      });

      it('when arrays are identical', () => {
        const a1 = [1, 2, 3];
        const a2 = [1, 2, 3];
        expect(ArrayUtils.compareArrays(a1, a2)).toBeTruthy();
      });

    });

    describe('should return false', () => {
      it('when the first array is null and other not', () => {
        const a1 = null;
        const a2 = [];
        expect(ArrayUtils.compareArrays(a1, a2)).toBeFalsy();
      });

      it('when the second array is null and other not', () => {
        const a1 = [];
        const a2 = null;
        expect(ArrayUtils.compareArrays(a1, a2)).toBeFalsy();
      });

      it('when arrays are different lengths', () => {
        const a1 = [1, 2];
        const a2 = [1, 2, 3];
        expect(ArrayUtils.compareArrays(a1, a2)).toBeFalsy();
      });

      it('when arrays contents are different', () => {
        const a1 = [1, 2, 4];
        const a2 = [1, 2, 3];
        expect(ArrayUtils.compareArrays(a1, a2)).toBeFalsy();
      });

      it('when arrays are ordered differently', () => {
        const a1 = [1, 3, 2];
        const a2 = [1, 2, 3];
        expect(ArrayUtils.compareArrays(a1, a2)).toBeFalsy();
      });
    });
  });
});
