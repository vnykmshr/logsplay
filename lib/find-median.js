'use strict';

module.exports = function (arr) {
    var len = arr.length;
    if (len % 2 === 1) {
        return arr[(len + 1) / 2];
    } else {
        return (arr[len / 2] + arr[len / 2 + 1]) / 2;
    }
};
