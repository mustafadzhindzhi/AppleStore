import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let i = 0; i < 300 + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};

const shopContextProvider = (props) => {
  const [all_product, setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());

  //   useEffect(() => {
  //     fetch("http://localhost:3000/allproducts")
  //       .then((res) => res.json())
  //       .then((data) => setAll_Product(data));

  //     if (localStorage.getItem("accessToken")) {
  //       fetch("http://localhost:3000/getcart", {
  //         method: "POST",
  //         headers: {
  //           Accept: "application/form-data",
  //           "accessToken": `${localStorage.getItem("accessToken)}`,
  //           "Content-Type": "application/json",
  //         },
  //         body: "",
  //       })
  //         .then((res) => res.json())
  //         .then((data) => setCartItems(data));
  //     }
  //   }, []);

//   const addToCart = (itemId) => {
//     setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 || 1 }));
//     if (localStorage.getItem("accessToken")) {
//       fetch("http://localhost:3000/addtocart", {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           accessToken: `${localStorage.getItem("accessToken")}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ itemId: itemId }),
//       })
//         .then((res) => res.json())
//         .then((data) => console.log(data))
//         .then((error) => console.log("Error adding to cart:", error));
//     }
//   };

//   const removeFromCart = (itemId) => {
//     setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
//     if (localStorage.getItem("accessToken")) {
//       fetch("http://localhost:3000/removefromcart", {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "auth-token": `${localStorage.getItem("auth-token")}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ itemId: itemId }),
//       })
//         .then((res) => res.json())
//         .then((data) => console.log(data))
//         .catch((error) => console.error("Error adding to cart:", error));
//     }
//   };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find(
          (product) => product.id === Number(item)
        );
        totalAmount += itemInfo.new_price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default shopContextProvider;