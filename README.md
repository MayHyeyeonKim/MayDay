# Shopping Mall Web Application : Mayday
This is a full-stack shopping mall web application built using the MERN stack.

## Backend Features

### User Features
- **Registration**: Users can sign up using their email or external accounts.
- **Login**: Users can log in using their email or external accounts.
- **OAuth with Google Auth Library**: Users can also sign up and log in using their Google accounts. <br>
        refer to [this documentation](https://www.npmjs.com/package/google-auth-library).
- **Profile Management**: Users can manage their personal information.
- **Shopping Landing Page**: Users can search for items, log in, and view buttons for shopping and ordering.
- **Product Detail Page**: Users can view detailed information about a product.
- **Cart Management**: Users can add items to their cart, modify item quantities, and remove items.
- **Checkout Page**: Users can complete the purchase. If items are out of stock, payment cannot be completed.
- **Reservation Completion Page**: Users can complete reservations and view the reservation number.
- **Order History**: Users can view their past orders.

### Admin Features
- **Product List Page**: Admins can view a list of all products.
- **Add Product**: Admins can add new products.
- **Search Product**: Admins can search for products.
- **Update Product**: Admins can update product information.
- **Delete Product**: Admins can delete products.
- **Pagination**: Admins can navigate through multiple pages of products.

### Order Management
- **Order Page**: Admins can view all orders.
- **Order Detail**: Admins can view detailed information about each order.
- **Update Order Status**: Admins can update the status of an order.
- **Order Search**: Admins can search for orders using the order number.

## Technologies Used
- **MongoDB**: Database for storing user and product data.
- **Express.js**: Backend framework for building RESTful APIs.
- **React.js**: Frontend framework for building user interfaces.
- **Node.js**: Runtime environment for executing JavaScript on the server.

## Document schema for MongoDB collection
![DB](https://github.com/MayHyeyeonKim/MayDay/blob/main/be/images/mddb.png)


# Logical Error Debugging Documentation

## Overview
This document describes the debugging process and the subsequent solution implemented to address a logical error in the stock management system. The error was related to the `checkStock` and `checkItemListStock` functions, which handle stock verification and stock processing for product items in an order.

## Problem Description
The system encountered a logical error when processing orders that included multiple items. Specifically, when the stock of one item was insufficient, the stock for other items was still being deducted. This behavior was incorrect and led to inconsistent stock levels.

### Example Scenario
1. A user attempts to purchase 1 unit of `Item1` and 2 units of `Item2`.
2. `Item1` has insufficient stock.
3. Despite the insufficient stock for `Item1`, the stock for `Item2` was still being reduced by 2 units.

## Solution
To resolve this issue, the functions were refactored to separate the concerns of stock verification and stock processing. The goal was to ensure that stock levels are only adjusted if all items in the order have sufficient stock.

### Refactored Functions
The following changes were made to the code:

1. **`checkStock` Function**:
    - This function now only verifies if the stock is sufficient for a given item.
    - It returns the verification status and the product information.

2. **`processStock` Function**:
    - This new function is responsible for reducing the stock of a given item.
    - It is called only after verifying that all items in the order have sufficient stock.

3. **`checkItemListStock` Function**:
    - This function verifies the stock for all items in the order.
    - If all items have sufficient stock, it then processes the stock reduction.
    - If any item has insufficient stock, no stock is reduced.

### Updated Code

```javascript
productController.checkStock = async (item) => {
    const product = await Product.findById(item.productId);
    if (!product) {
        return {
            isVerify: false,
            message: `Product not found for ID: ${item.productId}`,
        };
    }
    if (product.stock[item.size] < item.qty) {
        return {
            isVerify: false,
            message: `The inventory for ${product.name} in ${item.size} is low.`,
        };
    }
    return { isVerify: true, product };
};

productController.processStock = async (item) => {
    const product = await Product.findById(item.productId);
    const newStock = { ...product.stock };
    newStock[item.size] -= item.qty;
    product.stock = newStock;
    await product.save();
};

productController.checkItemListStock = async (itemList) => {
    const insufficientStockItems = [];
    const validItems = [];

    await Promise.all(
        itemList.map(async (item) => {
            const stockCheck = await productController.checkStock(item);
            if (!stockCheck.isVerify) {
                insufficientStockItems.push({ item, message: stockCheck.message });
            } else {
                validItems.push(item);
            }
        })
    );

    if (insufficientStockItems.length === 0) {
        await Promise.all(
            validItems.map(async (item) => {
                await productController.processStock(item);
            })
        );
    }

    return insufficientStockItems;
};
```
### Logical Flow
 #### checkStock Function:
- Finds the product by productId.
- Checks if the stock for the specified size is sufficient.
- Returns a verification status and the product information.
 #### processStock Function:
- Finds the product by productId.
- Reduces the stock for the specified size by the quantity in the order.
- Saves the updated product information.
 #### checkItemListStock Function:
- Iterates through all items in the order and checks their stock using checkStock.
- Collects items with insufficient stock in an array.
- If there are no items with insufficient stock, processes stock reduction for all items using processStock.
- Returns an array of items with insufficient stock (if any).
### Benefits of the Refactored Approach
 - Responsibility Separation: Each function has a single responsibility, improving code clarity and maintainability.
 - Consistency: Ensures that stock levels are only adjusted when all items in the order have sufficient stock.
 - Error Handling: Provides clear feedback on which items have insufficient stock, improving the user experience.
### Conclusion
 - The refactored code resolves the logical error by ensuring that stock levels are managed consistently and accurately. By separating stock verification and stock processing into distinct functions, the code adheres to best practices and enhances overall system reliability.