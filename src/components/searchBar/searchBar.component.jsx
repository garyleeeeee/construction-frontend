import './searchBar.styles.scss';

function SearchBar({ value, onChange, onConfirm, placeholder }) {
    return (
        <div className='warehouse-search-bar'>
            <input
                type='search'
                placeholder={placeholder}
                name='warehouse-search-bar'
                value={value}
                onChange={onChange}
            />
            <button onClick={onConfirm}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
        </div>
    );
};


export default SearchBar;