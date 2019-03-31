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
    ReactDOM.render(React.createElement(App, null), document.getElementById("reactContainer"));
    function App() {
        var _a = React.useState(true), isShowingSearch = _a[0], setShowingSearch = _a[1];
        var _b = React.useState(''), seachString = _b[0], setSearchString = _b[1];
        function onStateButtonClick(newState) {
            setShowingSearch(newState);
        }
        function onSearchStringChanged(searchPattern) {
            console.log("search for " + searchPattern);
            setSearchString(searchPattern);
            // api call to get the matches
        }
        if (isShowingSearch) {
            return (React.createElement(React.Fragment, null,
                React.createElement(ModeControl, { showingSearch: isShowingSearch, onClick: onStateButtonClick }),
                React.createElement(SearchControl, { onChange: onSearchStringChanged })));
        }
        else {
            return (React.createElement(React.Fragment, null,
                React.createElement(ModeControl, { showingSearch: isShowingSearch, onClick: onStateButtonClick }),
                React.createElement(NewPerson, null)));
        }
    }
    function ModeControl(props) {
        var searchClasses = "btn btn-primary active";
        var addClasses = "btn btn-secondary";
        if (!props.showingSearch) {
            searchClasses = "btn btn-secondary";
            addClasses = "btn btn-primary active";
        }
        return (React.createElement("div", { className: 'appModeSwitcher' },
            React.createElement("div", { className: "btn-group", role: "group", "aria-label": "Mode buttons" },
                React.createElement("button", { type: "button", className: searchClasses, onClick: function () { return props.onClick(true); } }, "Search"),
                React.createElement("button", { type: "button", className: addClasses, onClick: function () { return props.onClick(false); } }, "Add Person"))));
    }
    function SearchControl(props) {
        var onChange = function (e) {
            // extract the string and send it back via the callback
            props.onChange(e.target.value);
        };
        return (React.createElement("div", { className: 'form-group' },
            "Find:",
            React.createElement("input", { type: "search", className: "form-control", id: "txtSearch", onChange: function (e) { return onChange(e); }, placeholder: 'type letters to search for' })));
    }
    function NewPerson(props) {
        return (React.createElement("form", null,
            React.createElement("div", { className: 'form-group' },
                React.createElement("label", { htmlFor: 'FirstName' }, "First Name:"),
                React.createElement("input", { type: "text", className: "form-control", id: "FirstName" })),
            React.createElement("div", { className: 'form-group' },
                React.createElement("label", { htmlFor: 'LastName' }, "Last Name:"),
                React.createElement("input", { type: "text", className: "form-control", id: "LastName" })),
            React.createElement("div", { className: 'form-group' },
                React.createElement("label", { htmlFor: 'Address' }, "Address:"),
                React.createElement("input", { type: "text", className: "form-control", id: "Address" })),
            React.createElement("div", { className: 'form-group' },
                React.createElement("label", { htmlFor: 'Age' }, "Age:"),
                React.createElement("input", { type: "text", className: "form-control", id: "Age" })),
            React.createElement("div", { className: 'form-group' },
                React.createElement("label", { htmlFor: 'Interests' }, "Interests:"),
                React.createElement("input", { type: "text", className: "form-control", id: "Interests" })),
            React.createElement("div", { className: 'form-group' },
                React.createElement("label", { htmlFor: 'PortraitURL' }, "Portrait URL:"),
                React.createElement("input", { type: "text", className: "form-control", id: "PortraitURL" })),
            React.createElement("button", { type: "submit", className: 'btn btn-primary' }, "Submit")));
    }
});
//# sourceMappingURL=App.js.map