System.register(["./random"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (random_1_1) {
                exports_1({
                    "getRandomInteger": random_1_1["getRandomInteger"],
                    "shuffleArray": random_1_1["shuffleArray"]
                });
            }
        ],
        execute: function () {
        }
    };
});
//# sourceMappingURL=index.js.map