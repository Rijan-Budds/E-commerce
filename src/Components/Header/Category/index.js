import React, { useRef } from 'react';

const Category = () => {
  const categoryRefs = useRef([]);

  const handleItemClick = (category, index) => {
    if (document.activeElement === categoryRefs.current[index]) {
      console.log(`Clicked on category: ${category}`);
    }
  };

  const categories = [
    "Apparels & Accessories",
    "Automobiles",
    "Beauty and health",
    "Books and learning",
    "Business and industry",
    "Computers and peripherals",
    "Electronics, TVs and more",
    "Events and Happenings",
    "Jobs",
    "Music Instruments",
    "Mobile Phones and Accessories",
    "Pets for adoption",
    "Real estate",
    "Toys and video games",
    "Travel, Tours and Packages",
    "Services",
    "Furnishing and Appliances",
    "Fresh vegetables and meat"
  ];

  return (
    <div className="navigation-wrapper">
      <nav className="main-nav category-nav">
        <div className="scrollable-category">
          <ul>
            {categories.map((category, index) => (
              <li 
                key={index} 
                ref={el => categoryRefs.current[index] = el}
                onClick={() => handleItemClick(category, index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleItemClick(category, index);
                  }
                }}
                role="button"
                tabIndex={0}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Category;