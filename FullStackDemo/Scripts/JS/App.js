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
        var _b = React.useState(''), searchString = _b[0], setSearchString = _b[1];
        var _c = React.useState([]), searchResults = _c[0], setSearchResults = _c[1];
        var _d = React.useState(false), isWaiting = _d[0], setIsWaiting = _d[1];
        var showSearchResults = !isWaiting && isShowingSearch && searchString;
        function onStateButtonClick(newState) {
            setShowingSearch(newState);
        }
        function onSearchStringChanged(searchPattern) {
            setSearchString(searchPattern);
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
        function api(url) {
            setIsWaiting(true);
            return fetch(url)
                .then(function (response) {
                setIsWaiting(false);
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json().then(function (data) { return data; });
            });
        }
        return (React.createElement(React.Fragment, null,
            React.createElement(ModeControl, { showingSearch: isShowingSearch, onClick: onStateButtonClick }),
            isShowingSearch && React.createElement(SearchControl, { onChange: onSearchStringChanged, isWaiting: isWaiting }),
            showSearchResults && React.createElement(SearchResults, { results: searchResults }),
            !isShowingSearch && React.createElement(NewPerson, null)));
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
            props.onChange(e.target.value);
        };
        return (React.createElement("div", { className: 'form-group' },
            "Find:",
            React.createElement("input", { type: "search", className: "form-control", id: "txtSearch", onChange: function (e) { return onChange(e); }, placeholder: 'type letters to search for' }),
            props.isWaiting &&
                React.createElement("div", { className: 'alert alert-info top-margin' }, "Waiting for response...")));
    }
    function SearchResults(props) {
        var people = props.results;
        if (people.length == 0) {
            return (React.createElement("span", null, "No matching people found"));
        }
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
        var _a = React.useState(''), firstName = _a[0], setFirstName = _a[1];
        var _b = React.useState(''), lastName = _b[0], setLastName = _b[1];
        var _c = React.useState(''), address = _c[0], setAddress = _c[1];
        var _d = React.useState(''), age = _d[0], setAge = _d[1];
        var _e = React.useState(''), interests = _e[0], setInterests = _e[1];
        var _f = React.useState(''), portraitURL = _f[0], setPortraitURL = _f[1];
        var _g = React.useState(false), validationErrorsFound = _g[0], setValidationErrorsFound = _g[1];
        var _h = React.useState(''), submitMessage = _h[0], setSubmitMessage = _h[1];
        function updateFirstName(e) {
            var element = e.target;
            setFirstName(element.value);
        }
        function updateLastName(e) {
            var element = e.target;
            setLastName(element.value);
        }
        function updateAddress(e) {
            var element = e.target;
            setAddress(element.value);
        }
        function updateAge(e) {
            var element = e.target;
            setAge(element.value);
        }
        function updateInterests(e) {
            var element = e.target;
            setInterests(element.value);
        }
        function updatePortraitURL(e) {
            var element = e.target;
            setPortraitURL(element.value);
        }
        function isValidForm() {
            return firstName.length > 0 && lastName.length > 0;
        }
        function onSubmit(e) {
            e.preventDefault();
            if (isValidForm()) {
                setValidationErrorsFound(false);
                var ageAsNum = +age; // unary conversion
                var payload = { firstName: firstName, lastName: lastName, address: address, age: ageAsNum, interests: interests, portraitURL: portraitURL };
                apiPost('api/People/', payload)
                    .then(function () {
                    setFirstName('');
                    setLastName('');
                    setAddress('');
                    setAge('');
                    setInterests('');
                    setPortraitURL('');
                    setSubmitMessage('Person was added successfully');
                })
                    .catch(function (error) { return console.error(error); });
            }
            else {
                setValidationErrorsFound(true);
            }
        }
        function apiPost(url, payload) {
            return fetch(url, {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(function (response) {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json().then(function (data) { return data; });
            });
        }
        function ValidationErrorMessage() {
            return (React.createElement("div", { className: 'alert alert-dark' }, "You must enter a first and last name"));
        }
        function ConfirmationMessage(props) {
            return (React.createElement("div", { className: 'alert alert-secondary' }, props.message));
        }
        return (React.createElement(React.Fragment, null,
            React.createElement("form", { onSubmit: onSubmit },
                React.createElement("div", { className: 'form-group' },
                    React.createElement("label", { htmlFor: 'FirstName' }, "First Name:"),
                    React.createElement("input", { type: "text", className: "form-control", id: "FirstName", value: firstName, onChange: updateFirstName, maxLength: 25 })),
                React.createElement("div", { className: 'form-group' },
                    React.createElement("label", { htmlFor: 'LastName' }, "Last Name:"),
                    React.createElement("input", { type: "text", className: "form-control", id: "LastName", value: lastName, onChange: updateLastName, maxLength: 25 })),
                React.createElement("div", { className: 'form-group' },
                    React.createElement("label", { htmlFor: 'Address' }, "Address:"),
                    React.createElement("input", { type: "text", className: "form-control", id: "Address", value: address, onChange: updateAddress, maxLength: 100 })),
                React.createElement("div", { className: 'form-group' },
                    React.createElement("label", { htmlFor: 'Age' }, "Age:"),
                    React.createElement("input", { type: "number", className: "form-control", id: "Age", value: age, onChange: updateAge, maxLength: 5, min: 1, max: 100 })),
                React.createElement("div", { className: 'form-group' },
                    React.createElement("label", { htmlFor: 'Interests' }, "Interests:"),
                    React.createElement("input", { type: "text", className: "form-control", id: "Interests", value: interests, onChange: updateInterests, maxLength: 1000 })),
                React.createElement("div", { className: 'form-group' },
                    React.createElement("label", { htmlFor: 'PortraitURL' }, "Portrait URL:"),
                    React.createElement("input", { type: "text", className: "form-control", id: "PortraitURL", value: portraitURL, onChange: updatePortraitURL, maxLength: 200 })),
                React.createElement("button", { type: "submit", className: 'btn btn-primary' }, "Submit")),
            validationErrorsFound && React.createElement(ValidationErrorMessage, null),
            submitMessage.length > 0 && React.createElement(ConfirmationMessage, { message: submitMessage })));
    }
});
//# sourceMappingURL=App.js.map