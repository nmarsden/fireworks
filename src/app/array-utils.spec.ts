import { ArrayUtils } from './array-utils';

describe('ArrayUtils', () => {

  describe('compareArrays', () => {
    it('should return true when arrays are identical', () => {
      const a1 = [1, 2, 3];
      const a2 = [1, 2, 3];
      expect(ArrayUtils.compareArrays(a1, a2)).toBeTruthy();
    });

    it('should return false when arrays are different lengths', () => {
      const a1 = [1, 2];
      const a2 = [1, 2, 3];
      expect(ArrayUtils.compareArrays(a1, a2)).toBeFalsy();
    });

    it('should return false when arrays contents are different', () => {
      const a1 = [1, 2, 4];
      const a2 = [1, 2, 3];
      expect(ArrayUtils.compareArrays(a1, a2)).toBeFalsy();
    });

    it('should return false when arrays are ordered differently', () => {
      const a1 = [1, 3, 2];
      const a2 = [1, 2, 3];
      expect(ArrayUtils.compareArrays(a1, a2)).toBeFalsy();
    });
  });
});
