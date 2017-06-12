System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function getRandomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    exports_1("getRandomInteger", getRandomInteger);
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }
    exports_1("shuffleArray", shuffleArray);
    return {
        setters:[],
        execute: function() {
        }
    }
});
//# sourceMappingURL=random.js.map