export class ArrayUtils {

  static compareArrays(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false;
    }
    let result = true;
    arr1.forEach((e1, i) => {
      if ( e1 !== arr2[i] ) {
        result = false;
      }
    });
    return result;
  }

}
