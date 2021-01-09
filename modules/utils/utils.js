export function range(size) {
    // console.log(Array.apply(null, Array(size)));
    // console.log( Array.apply(null, Array(size)).map((value, index) => index));
    return Array.apply(null, Array(size)).map((value, index) => index);
}