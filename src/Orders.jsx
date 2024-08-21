import React from "react";
import "./App.css";

const Orders = ({ orders, onDismiss }) => {
  // Calculate the total time for all orders
  const totalTimeForAllOrders = Object.values(orders).reduce(
    (total, order) => total + order.totalTime,
    0
  );

  return (
    <div className="orders">
      <h3>Past Orders:</h3>
      {Object.keys(orders).length > 0 ? (
        <div>
          {Object.entries(orders).map(([orderId, order]) => (
            <div className="order-item" key={orderId}>
              <h4>Order ID: {orderId}</h4>
              {order.items.map((item, index) => (
                <p key={index}>
                  {item.name} - ${item.price} - {formatTime(item.timeToMake)}
                </p>
              ))}
              <p>Total: ${order.total}</p>
              <p>Total Time to Make: {formatTime(order.totalTime)}</p>
              <p>Order Time: {order.orderTime}</p>
              <button onClick={() => onDismiss(orderId)}>Dismiss</button>
            </div>
          ))}
          <h1>
            Total time for all orders: {formatTime(totalTimeForAllOrders)}
          </h1>
        </div>
      ) : (
        <p>No orders found</p>
      )}
    </div>
  );
};

export default Orders;

function formatTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}
