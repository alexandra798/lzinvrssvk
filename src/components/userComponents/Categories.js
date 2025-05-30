import React from 'react';

//这不是一个页面因此不需要route也不需要useEffect来render

const Categories = ({ activeCategory, setActiveCategory }) => {
    const categories = [
        '分区1',
        '分区2',
        '分区3',
        '分区4',
        '分区5'
    ];

    return (
        <div className='categories-container'>
            {categories.map((category) => (
                <button
                    key={category}
                    className={`category-btn ${activeCategory === category ? 'active' : ''}`}
                    onClick={() => setActiveCategory(category)}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

export default Categories;

