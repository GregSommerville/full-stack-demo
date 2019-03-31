import * as React from "react";
import * as ReactDOM from "react-dom";

ReactDOM.render(<App />, document.getElementById("reactContainer"));


function App() {
    const [isShowingSearch, setShowingSearch] = React.useState(true);
    const [seachString, setSearchString] = React.useState('');

    function onStateButtonClick(newState: boolean): void {
        setShowingSearch(newState);
    }

    function onSearchStringChanged(searchPattern: string): void {
        console.log(`search for ${searchPattern}`);
        setSearchString(searchPattern);

        // api call to get the matches
    }

    if (isShowingSearch) {
        return (
            <>
                <ModeControl showingSearch={isShowingSearch} onClick={onStateButtonClick} />
                <SearchControl onChange={onSearchStringChanged} />
            </>
        );
    }
    else {
        return (
            <>
                <ModeControl showingSearch={isShowingSearch} onClick={onStateButtonClick} />
                <NewPerson />
            </>
        );
    }
}

function ModeControl(props) {
    let searchClasses: string = "btn btn-primary active";
    let addClasses: string = "btn btn-secondary";
    if (!props.showingSearch) {
        searchClasses = "btn btn-secondary";
        addClasses = "btn btn-primary active";
    }

    return (
        <div className='appModeSwitcher'>
            <div className="btn-group" role="group" aria-label="Mode buttons">
                <button type="button" className={searchClasses} onClick={() => props.onClick(true)} >Search</button>
                <button type="button" className={addClasses} onClick={() => props.onClick(false)}>Add Person</button>
            </div>
        </div>
    );
}

function SearchControl(props) {

    const onChange = (e) => {
        // extract the string and send it back via the callback
        props.onChange(e.target.value);
    };

    return (
        <div className='form-group'>
            Find: 
            <input type="search" className="form-control" id="txtSearch"
                onChange={(e) => onChange(e)}
                placeholder='type letters to search for' />
        </div>
        );
}

function NewPerson(props) {
    return (
        <form>
            <div className='form-group'>
                <label htmlFor='FirstName'>First Name:</label>
                <input type="text" className="form-control" id="FirstName" />
            </div>
            <div className='form-group'>
                <label htmlFor='LastName'>Last Name:</label>
                <input type="text" className="form-control" id="LastName" />
            </div>
            <div className='form-group'>
                <label htmlFor='Address'>Address:</label>
                <input type="text" className="form-control" id="Address" />
            </div>
            <div className='form-group'>
                <label htmlFor='Age'>Age:</label>
                <input type="text" className="form-control" id="Age" />
            </div>
            <div className='form-group'>
                <label htmlFor='Interests'>Interests:</label>
                <input type="text" className="form-control" id="Interests" />
            </div>
            <div className='form-group'>
                <label htmlFor='PortraitURL'>Portrait URL:</label>
                <input type="text" className="form-control" id="PortraitURL" />
            </div>
            <button type="submit" className='btn btn-primary'>Submit</button>
        </form>
    );
}