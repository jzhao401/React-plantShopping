import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    // Sum each item's cost multiplied by its quantity.
    // `item.cost` may be a number or a string (e.g., "$12.99").
    // Convert to a numeric value before the calculation.
    const total = cart.reduce((sum, item) => {
      const numericCost = typeof item.cost === 'string'
        ? parseFloat(item.cost.replace(/[^0-9.-]+/g, ''))
        : item.cost;
      return sum + (numericCost * item.quantity);
    }, 0);

    // Return a string with two decimal places for display.
    return total.toFixed(2);
  };

  const handleContinueShopping = (e) => {
    // Prevent default link/button behavior if present
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
    // Invoke the callback supplied by the parent to return to the product list
    if (typeof onContinueShopping === 'function') {
      onContinueShopping(e);
    }
  };

  // Simple checkout handler – currently just logs a message.
  const handleCheckoutShopping = (e) => {
    // Prevent default button behavior if present
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
    // Placeholder action for checkout
    console.log('Checkout button clicked – implement checkout flow here.');
  };

  // Increment the quantity of a cart item by 1
  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        amount: item.quantity + 1,
      })
    );
  };

  // Decrement the quantity of a cart item.
  // If the resulting quantity would be 0, remove the item from the cart.
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          name: item.name,
          amount: item.quantity - 1,
        })
      );
    } else {
      // Quantity would drop to 0 → remove the item entirely
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
