System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function goToHash(hash) {
        window.location.hash = hash;
    }
    exports_1("goToHash", goToHash);
    function getHash() {
        return window.location.hash;
    }
    exports_1("getHash", getHash);
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=routes.js.map