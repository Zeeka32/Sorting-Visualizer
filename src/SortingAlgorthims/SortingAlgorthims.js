//from algoExpert
export function mergeSort(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
}

function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([i, j]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([i, j]);
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            // We overwrite the value at index k in the original array with the
            // value at index i in the auxiliary array.
            animations.push([k, auxiliaryArray[i]]);
            mainArray[k++] = auxiliaryArray[i++];
        } else {
            // We overwrite the value at index k in the original array with the
            // value at index j in the auxiliary array.
            animations.push([k, auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[j++];
        }
    }
    while (i <= middleIdx) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([i, i]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([i, i]);
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([j, j]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([j, j]);
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
    }
}

export const insertionSort = array => {
    const animations = []

    for (let i = 1, j = 0; i < array.length; i++) {

        let tempElement = array[i];

        for (j = i; j > 0 && tempElement < array[j - 1]; j--) {
            animations.push([-1, -2]);
            animations.push([j, j - 1]);
            array[j] = array[j - 1];
            animations.push([j, array[j - 1]]);
        }

        animations.push([-5, -1]);
        animations.push([j, tempElement]);
        array[j] = tempElement;

    }

    return animations;
};

export const normalSort = array => {
    const animations = [];
    for (let i = 0; i < array.length; i++) {
        for (let j = i + 1; j < array.length; j++) {
            animations.push([i, j]);
            if (array[i] > array[j]) {
                animations.push([-1, -1]);
                animations.push([i, array[j]]);
                animations.push([j, array[i]]);
                let temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }

        }
    }
    return animations;
}

function swap(arr, xp, yp) {
    var temp = arr[xp];
    arr[xp] = arr[yp];
    arr[yp] = temp;
}

export const selectionSort = array => {
    const animations = [];

    var i, j, min_idx;
    for (i = 0; i < array.length; i++) {

        min_idx = i;
        animations.push([-2]);
        animations.push([i]);

        for (j = i + 1; j < array.length; j++) {
            animations.push([j]);
            if (array[j] < array[min_idx]) {
                min_idx = j;
                animations.push([-1]);
                animations.push([j]);
            }

        }

        animations.push([min_idx, array[i]]);
        animations.push([i, array[min_idx]]);
        swap(array, min_idx, i);
    }

    return animations;
}