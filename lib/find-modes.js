'use strict';

module.exports = function (arr) {
    if (arr.length === 0) {
        return null;
    }

    var i, el, modeMap = {},
        maxCount = 1,
        modes = [arr[0]];

    for (i = 0; i < arr.length; i++) {
        el = arr[i];

        if (!modeMap[el])
            modeMap[el] = 1;
        else
            modeMap[el]++;

        if (modeMap[el] > maxCount) {
            modes = [el];
            maxCount = modeMap[el];
        } else if (modeMap[el] === maxCount) {
            modes.push(el);
            maxCount = modeMap[el];
        }
    }

    return modes;
};
