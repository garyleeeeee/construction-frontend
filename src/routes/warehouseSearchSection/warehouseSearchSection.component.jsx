import './warehouseSearchSection.styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faCircleChevronUp, faCircleChevronDown, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useState, useContext } from 'react';
import { UserContext } from '../../contexts/user.context';
import { Navigate } from 'react-router-dom';

const categories = [
    '办公用品','生活用品','办公设备','生活设备',
    '施工工具','临水配件','临电配件','劳保用品',
    '电气设备','水施设备','装饰材料','防水材料',
    '结构型材','结构木材','措施材料','建筑原料',
    '测量设备','信息化设备','智能化设备'
];


function SearchBar({ value, onChange, onConfirm }) {
    return (
        <div className='warehouse-search-bar'>
            <input
                type='search'
                placeholder='输入货物名称查询'
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

function CategorySelector({ isOpen, onToggle, selectedCategory, onSelect }) {
    return (
        <div className='warehouse-categories-container'>
            <div className='warehouse-categories-header' onClick={onToggle}>
                <FontAwesomeIcon icon={isOpen ? faCircleChevronDown : faCircleChevronUp} />
                <h4>按类目查找</h4>
            </div>
            {isOpen &&
                <div className='warehouse-categories-list'>
                    {categories.map((category, index) => (
                        <button
                            key={index.toString()}
                            className={`warehouse-category-button ${selectedCategory === category ? 'selected' : ''}`}
                            onClick={() => onSelect(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            }
        </div>
    );
}

function SearchResults({ result, category, onClear }) {
    if (!result && !category) return null;

    return (
        <div className='warehouse-search-result'>
            <div className='warehouse-search-result-header'>
                <h3>搜索结果：</h3>
                <FontAwesomeIcon icon={faCircleXmark} className='warehouse-search-result-clear-button' onClick={onClear} />
            </div>
            {result && <span>{`搜索关键词:${result}`}</span>}
            {category && <span>{`搜索类目:${category}`}</span>}
        </div>
    );
}

export default function WareHouseSearchSection() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [searchResult, setSearchResult] = useState('');
    const { currentUser } = useContext(UserContext);

    const handleInputChange = (e) => setInputValue(e.target.value);

    const handleSearchConfirm = () => {
        if (!inputValue) return;

        setSelectedCategory(null);
        setSearchResult(inputValue);
        setIsOpen(false);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setInputValue('');
        setSearchResult('');
        setIsOpen(false);
    };

    const handleClearResults = () => {
        setSelectedCategory(null);
        setSearchResult('');
        setInputValue('');
    };

    // Check for currentUser, redirect if not found
    if (!currentUser) {
        return <Navigate to='/' />;
        }

    return (
        <div className='warehouse-search-section'>
            <SearchBar 
                value={inputValue} 
                onChange={handleInputChange} 
                onConfirm={handleSearchConfirm}
            />
            <CategorySelector 
                isOpen={isOpen} 
                onToggle={() => setIsOpen(!isOpen)}
                selectedCategory={selectedCategory} 
                onSelect={handleCategorySelect}
            />
            <SearchResults 
                result={searchResult} 
                category={selectedCategory} 
                onClear={handleClearResults} 
            />
        </div>
    );
}

