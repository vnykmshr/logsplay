'use strict';

Array.prototype.sum = function () {
    var total = 0;
    var i = this.length;

    while (i--) {
        total += this[i];
    }

    return total;
};

module.exports = function (arr) {
    return arr.sum() / arr.length;
};
