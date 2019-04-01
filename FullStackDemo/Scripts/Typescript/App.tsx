import * as React from "react";
import * as ReactDOM from "react-dom";

ReactDOM.render(<App />, document.getElementById("reactContainer"));

interface IPerson {
    firstName: string;
    lastName: string;
    address: string;
    age: number;
    portraitURL: string;
    interests: string;
}

function App() {
    const [isShowingSearch, setShowingSearch] = React.useState(true);
    const [searchString, setSearchString] = React.useState('');
    const [searchResults, setSearchResults] = React.useState<IPerson[]>([]);
    const [isWaiting, setIsWaiting] = React.useState(false);

    const showSearchResults = !isWaiting && isShowingSearch && searchString;

    function onStateButtonClick(newState: boolean): void {
        setShowingSearch(newState);
    }

    function onSearchStringChanged(searchPattern: string): void {
        setSearchString(searchPattern);

        if (searchPattern) {
            api<IPerson[]>(`api/People/${searchPattern}`)
                .then((response) => {
                    setSearchResults(response);
                })
                .catch(error => console.error(error));
        } else {
            setSearchResults([]);
        }        
    }

    function api<T>(url: string): Promise<T> {
        setIsWaiting(true);

        return fetch(url)
            .then(response => {
                setIsWaiting(false);

                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                return response.json().then(data => data as T);
            })
    }

    return (
        <>
            <ModeControl showingSearch={isShowingSearch} onClick={onStateButtonClick} />
            {isShowingSearch && <SearchControl onChange={onSearchStringChanged} isWaiting={isWaiting} />}
            {showSearchResults && <SearchResults results={searchResults} />}
            {!isShowingSearch && <NewPerson /> }
        </>
    );    
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
            {props.isWaiting &&                 
                <div className='alert alert-info top-margin'>Waiting for response...</div>
            }
        </div>
        );
}

function SearchResults(props) {
    const people = props.results as IPerson[];
    if (people.length == 0) {
        return (
            <span>No matching people found</span>
        );
    }

    return (
        <div className='container' >
            <div className='row'>
                {people.map(person => <SearchResult {...person} />)}
            </div>
        </div>
        );
}

function SearchResult(props: IPerson) {
    return (
        <div className='col-sm-6 col-md-4 col-lg-3'>
            <div className='personCard'>
                <div className='card'>
                    <img src={props.portraitURL} className='card-img-top' />
                    <div className='card-body'>
                        <div className='card-title'>
                            <span className='personName'>{props.firstName} {props.lastName}</span>
                        </div>
                        <div className='card-text'>
                            <div className='personAddress'>{props.address}</div>
                            <div className='personAge'>Age: {props.age}</div>
                            <div className='personInterests'>Interests: {props.interests}</div>
                        </div>
                    </div>
                </div >
            </div>
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