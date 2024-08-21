import React, { useEffect, useState } from "react";
import { database } from "../../fb";
import { ref, onValue } from "firebase/database";
import { Link } from "react-router-dom";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const ordersRef = ref(database, "orders");

    const unsubscribe = onValue(ordersRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();

        // Convert the orders object to an array, add the orderId, and sort by lineId
        const ordersArray = Object.entries(data)
          .map(([orderId, order]) => ({ ...order, orderId }))
          .sort((a, b) => a.lineId - b.lineId);

        setOrders(ordersArray);
      } else {
        console.log("No orders available");
        setOrders([]);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="orders-page p-6 bg-gray-50 min-h-screen">
      <h3 className="text-3xl font-bold text-gray-800 mb-6">Orders</h3>
      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              className="order-item bg-white p-5 rounded-lg shadow-lg border border-gray-200"
              key={order.orderId}
            >
              <h4 className="text-2xl font-semibold text-gray-900 mb-3">
                Order ID: {order.orderId}
              </h4>
              {order.items.map((item, index) => (
                <p className="text-gray-700 mb-2" key={index}>
                  {item.name} x {item.quantity} - ${item.price * item.quantity}{" "}
                  - {formatTime(item.timeToMake * item.quantity)}
                </p>
              ))}
              <p className="text-lg font-semibold text-gray-800 mb-2">
                Total: ${order.total}
              </p>
              <p className="text-lg text-gray-600 mb-4">
                Total Time to Make: {formatTime(order.totalTime)}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Order Time: {order.orderTime}
              </p>
              <Link
                to={`/orders/active/${order.orderId}`}
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Track this order
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No orders found</p>
      )}
    </div>
  );
};

export default OrdersPage;

function formatTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}
