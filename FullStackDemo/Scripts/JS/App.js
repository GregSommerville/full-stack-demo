(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "react", "react-dom"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var React = require("react");
    var ReactDOM = require("react-dom");
    var App = function () { return (React.createElement("div", null,
        React.createElement("h1", null, "Hi There!"))); };
    ReactDOM.render(React.createElement(App, null), document.getElementById("reactContainer"));
});
//# sourceMappingURL=App.js.map