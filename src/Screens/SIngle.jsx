import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { database } from "../../fb";
import { ref, onValue } from "firebase/database";

const SingleActiveOrderPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [ordersBefore, setOrdersBefore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ordersRef = ref(database, "orders");

    const unsubscribe = onValue(ordersRef, (snapshot) => {
      setLoading(false);
      if (snapshot.exists()) {
        const data = snapshot.val();

        const activeOrders = Object.entries(data)
          .filter(([, order]) => order.status === true)
          .sort((a, b) => a[1].lineId - b[1].lineId);

        const currentOrderIndex = activeOrders.findIndex(
          ([id]) => id === orderId
        );

        if (currentOrderIndex >= 0) {
          const [id, orderData] = activeOrders[currentOrderIndex];
          setOrder({ id, ...orderData });

          // Calculate the cumulative time of orders before the current one
          const totalTimeBefore = activeOrders
            .slice(0, currentOrderIndex)
            .reduce(
              (total, [, order]) =>
                total +
                order.items.reduce(
                  (orderTotal, item) =>
                    orderTotal + item.timeToMake * item.quantity,
                  0
                ),
              0
            );

          // Calculate total time including the current order
          const totalTimeIncludingCurrent =
            totalTimeBefore + orderData.totalTime;

          // Calculate the remaining time for the current order
          const orderStartTime = new Date(orderData.orderTime).getTime() / 1000; // Order time in seconds
          const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
          const elapsedTime = currentTime - orderStartTime;
          const timeRemainingInSeconds =
            totalTimeIncludingCurrent * 60 - elapsedTime; // Total time in seconds minus elapsed time

          // For the first order, remaining time should be its own total time
          const timeRemainingForFirstOrder =
            currentOrderIndex === 0
              ? orderData.totalTime * 60 // Total time of the first order
              : Math.max(timeRemainingInSeconds, 0); // Time remaining for other orders

          setOrdersBefore(currentOrderIndex);
          setTimeRemaining(Math.max(timeRemainingForFirstOrder, 0)); // Calculate remaining time in seconds
        } else {
          setOrder(null);
          setOrdersBefore(0);
          setTimeRemaining(0);
        }
      } else {
        console.log("No orders available");
        setOrder(null);
        setOrdersBefore(0);
        setTimeRemaining(0);
      }
    });

    return () => unsubscribe();
  }, [orderId]);

  useEffect(() => {
    if (timeRemaining > 0) {
      const timerId = setInterval(() => {
        setTimeRemaining((prevTime) => Math.max(prevTime - 1, 0));
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [timeRemaining]);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (!order)
    return (
      <p className="text-center text-gray-600">
        Order not found or no active orders available
      </p>
    );

  return (
    <div className="single-active-order-page p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
      <h3 className="text-2xl font-bold mb-4">Tracking Order ID: {orderId}</h3>
      <p className="text-xl font-semibold mb-2">Items:</p>
      {order.items.map((item, index) => (
        <div key={index} className="mb-3 border-b border-gray-300 pb-2">
          <p className="text-lg">
            {item.name} - Quantity: {item.quantity} - ${item.price}
          </p>
          <p className="text-gray-600">
            Total Time: {formatTime(item.timeToMake * item.quantity)}
          </p>
        </div>
      ))}
      <p className="text-xl font-semibold mb-2">Total: ${order.total}</p>
      <p className="text-xl font-semibold mb-4">
        Total Time to Make: {formatTime(order.totalTime)}
      </p>
      <p className="text-gray-600 mb-4">Order Time: {order.orderTime}</p>
      <h4 className="text-lg font-semibold mb-2">
        Orders before this one: {ordersBefore}
      </h4>
      <h4 className="text-lg font-semibold">
        Time Remaining for this Order: {formatTimeSeconds(timeRemaining)}
      </h4>
    </div>
  );
};

export default SingleActiveOrderPage;

function formatTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

function formatTimeSeconds(seconds) {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return `${hours}h ${mins}m ${secs}s`;
}
