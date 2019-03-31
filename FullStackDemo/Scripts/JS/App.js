var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
        var _c = React.useState([]), searchResults = _c[0], setSearchResults = _c[1];
        function onStateButtonClick(newState) {
            setShowingSearch(newState);
        }
        function onSearchStringChanged(searchPattern) {
            setSearchString(searchPattern);
            // api call to get the matches
            if (searchPattern) {
                api("api/People/" + searchPattern)
                    .then(function (response) {
                    setSearchResults(response);
                })
                    .catch(function (error) { return console.error(error); });
            }
            else {
                setSearchResults([]);
            }
        }
        if (isShowingSearch) {
            return (React.createElement(React.Fragment, null,
                React.createElement(ModeControl, { showingSearch: isShowingSearch, onClick: onStateButtonClick }),
                React.createElement(SearchControl, { onChange: onSearchStringChanged }),
                React.createElement(SearchResults, { results: searchResults })));
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
    function SearchResults(props) {
        var people = props.results;
        return (React.createElement("div", { className: 'container' },
            React.createElement("div", { className: 'row' }, people.map(function (person) { return React.createElement(SearchResult, __assign({}, person)); }))));
    }
    function SearchResult(props) {
        return (React.createElement("div", { className: 'col-sm-6 col-md-4 col-lg-3' },
            React.createElement("div", { className: 'personCard' },
                React.createElement("div", { className: 'card' },
                    React.createElement("img", { src: props.portraitURL, className: 'card-img-top' }),
                    React.createElement("div", { className: 'card-body' },
                        React.createElement("div", { className: 'card-title' },
                            React.createElement("span", { className: 'personName' },
                                props.firstName,
                                " ",
                                props.lastName)),
                        React.createElement("div", { className: 'card-text' },
                            React.createElement("div", { className: 'personAddress' }, props.address),
                            React.createElement("div", { className: 'personAge' },
                                "Age: ",
                                props.age),
                            React.createElement("div", { className: 'personInterests' },
                                "Interests: ",
                                props.interests)))))));
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
    function api(url) {
        return fetch(url)
            .then(function (response) {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json().then(function (data) { return data; });
        });
    }
});
//# sourceMappingURL=App.js.map