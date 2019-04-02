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
            {!isShowingSearch && <NewPerson />}
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

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [age, setAge] = React.useState('');
    const [interests, setInterests] = React.useState('');
    const [portraitURL, setPortraitURL] = React.useState('');
    const [validationErrorsFound, setValidationErrorsFound] = React.useState(false);
    const [submitMessage, setSubmitMessage] = React.useState('');

    function updateFirstName(e: React.ChangeEvent<HTMLInputElement>): void {
        var element = e.target as HTMLInputElement;
        setFirstName(element.value);
    }

    function updateLastName(e: React.ChangeEvent<HTMLInputElement>): void {
        var element = e.target as HTMLInputElement;
        setLastName(element.value);
    }

    function updateAddress(e: React.ChangeEvent<HTMLInputElement>): void {
        var element = e.target as HTMLInputElement;
        setAddress(element.value);
    }

    function updateAge(e: React.ChangeEvent<HTMLInputElement>): void {
        var element = e.target as HTMLInputElement;
        setAge(element.value);
    }

    function updateInterests(e: React.ChangeEvent<HTMLInputElement>): void {
        var element = e.target as HTMLInputElement;
        setInterests(element.value);
    }

    function updatePortraitURL(e: React.ChangeEvent<HTMLInputElement>): void {
        var element = e.target as HTMLInputElement;
        setPortraitURL(element.value);
    }

    function isValidForm(): boolean {
        return firstName.length > 0 && lastName.length > 0;
    }

    function onSubmit(e: React.FormEvent): void {
        e.preventDefault();
        
        if (isValidForm()) {
            setValidationErrorsFound(false);
            const ageAsNum: number = +age;  // unary conversion
            const payload: IPerson = { firstName, lastName, address, age: ageAsNum, interests, portraitURL };
            apiPost<IPerson>('api/People/', payload)
                .then(() => {
                    setFirstName('');
                    setLastName('');
                    setAddress('');
                    setAge('');
                    setInterests('');
                    setPortraitURL('');
                    setSubmitMessage('Person was added successfully');
                })
                .catch(error => console.error(error));

        } else {
            setValidationErrorsFound(true);
        }
    }

    function apiPost<T>(url: string, payload: IPerson): Promise<T> {
        return fetch(url,
            {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                return response.json().then(data => data as T);
            });
    }

    function ValidationErrorMessage() {
        return (
            <div className='alert alert-dark'>
                You must enter a first and last name
        </div>
        );
    }

    function ConfirmationMessage(props) {
        return (
            <div className='alert alert-secondary'>
                {props.message}
            </div>
        );
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='FirstName'>First Name:</label>
                    <input type="text" className="form-control" id="FirstName" value={firstName} onChange={updateFirstName} maxLength={25} />
                </div>
                <div className='form-group'>
                    <label htmlFor='LastName'>Last Name:</label>
                    <input type="text" className="form-control" id="LastName" value={lastName} onChange={updateLastName} maxLength={25}  />
                </div>
                <div className='form-group'>
                    <label htmlFor='Address'>Address:</label>
                    <input type="text" className="form-control" id="Address" value={address} onChange={updateAddress} maxLength={100}  />
                </div>
                <div className='form-group'>
                    <label htmlFor='Age'>Age:</label>
                    <input type="number" className="form-control" id="Age" value={age} onChange={updateAge} maxLength={5} min={1} max={100}  />
                </div>
                <div className='form-group'>
                    <label htmlFor='Interests'>Interests:</label>
                    <input type="text" className="form-control" id="Interests" value={interests} onChange={updateInterests} maxLength={1000} />
                </div>
                <div className='form-group'>
                    <label htmlFor='PortraitURL'>Portrait URL:</label>
                    <input type="text" className="form-control" id="PortraitURL" value={portraitURL} onChange={updatePortraitURL} maxLength={200} />
                </div>
                <button type="submit" className='btn btn-primary'>Submit</button>
            </form>
            {validationErrorsFound && <ValidationErrorMessage />}
            {submitMessage.length > 0 && <ConfirmationMessage message={submitMessage} />}
        </>
    );
}