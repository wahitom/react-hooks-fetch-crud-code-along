import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  //fetch data frm json server
  //we are using this use state to fetch to take care of any side effects that might occur
  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((response) => response.json())
      .then((items) => setItems(items))
      .catch((err) => console.log(err));
  }, []);

  function handleAddItem(newItem) {
    console.log("In ShoppingList", newItem);
    setItems([...items, newItem]);
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  //callback function to update the items in the cart
  function handleUpdatedItem(updatedItem) {
    console.log("In ShoppingCart:", updatedItem);

    const updatedItems = items.map((item) => {
      if (item.id === updatedItem.id) {
        return updatedItem;
      } else {
        return item;
      }
    });

    setItems(updatedItems);
  }

  //add delete functions
  function handleDeletedItem(deletedItem) {
    console.log("In SoppingCart:", deletedItem);
    const updatedItems = items.filter((item) => item.id !== deletedItem.id);
    setItems(updatedItems);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item
            key={item.id}
            item={item}
            onUpdateItem={handleUpdatedItem}
            onDeleteItem={handleDeletedItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
