import React, { useEffect, useState } from 'react';

function Category({ categoryName }) {
  // Fetch content for the given category from your data source
  // You can use the "categoryName" to identify the content to display
  const content = {}; // Replace with actual content
  const [data, setData] = useState({});
  
  useEffect(() => {
    // Fetch data for the category from your API when the component mounts
    fetch(`/api/category/${categoryName}`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, [categoryName]);

  return (
    <div>
      <h1>{categoryName}</h1>
      <p>{content.description}</p>
      {/* Render additional content here */}
    </div>
  );
}

export default Category;
