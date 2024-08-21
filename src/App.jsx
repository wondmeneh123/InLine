import { useState, useEffect } from "react";
import { database } from "../fb";
import { ref, onValue, push, update, set } from "firebase/database";
import Orders from "./Orders";
import { Link } from "react-router-dom";

function App() {
  const [foodItems, setFoodItems] = useState([
    { id: "1", name: "Burger", price: 5, timeToMake: 10, quantity: 1 },
    { id: "2", name: "Pizza", price: 8, timeToMake: 15, quantity: 1 },
    { id: "3", name: "Salad", price: 4, timeToMake: 7, quantity: 1 },
  ]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState({});
  const [nextLineId, setNextLineId] = useState(1);

  useEffect(() => {
    const ordersRef = ref(database, "orders");

    const unsubscribe = onValue(ordersRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();

        const calculatedOrders = Object.entries(data).map(
          ([orderId, order]) => {
            const totalTime = order.items.reduce(
              (total, item) => total + item.timeToMake * item.quantity,
              0
            );
            return { ...order, orderId, totalTime };
          }
        );

        const sortedOrders = calculatedOrders.sort(
          (a, b) => a.lineId - b.lineId
        );

        const ordersWithTotalTime = Object.fromEntries(
          sortedOrders.map((order) => [order.orderId, order])
        );

        const activeOrders = Object.fromEntries(
          Object.entries(ordersWithTotalTime).filter(
            ([, order]) => order.status !== false
          )
        );

        setOrders(activeOrders);
        setNextLineId(
          Math.max(...calculatedOrders.map((order) => order.lineId)) + 1
        );
      } else {
        console.log("No orders available");
        setOrders({});
      }
    });

    return () => unsubscribe();
  }, []);

  function adjustQuantity(id, delta) {
    setFoodItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  }

  function addToCart(foodItem) {
    const itemInCart = cart.find((item) => item.id === foodItem.id);
    if (itemInCart) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === foodItem.id
            ? { ...item, quantity: item.quantity + foodItem.quantity }
            : item
        )
      );
    } else {
      setCart((prevCart) => [...prevCart, foodItem]);
    }
  }

  function placeOrder() {
    const newOrder = {
      lineId: nextLineId,
      items: cart,
      total: cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
      totalTime: cart.reduce(
        (total, item) => total + item.timeToMake * item.quantity,
        0
      ),
      orderTime: new Date().toLocaleString(),
      status: true,
      name: "Wondmeneh Fekadu",
      phoneNumber: "0987654321",
    };

    set(push(ref(database, "orders")), newOrder)
      .then(() => {
        console.log("Order placed successfully");
        setCart([]);
        setNextLineId((prevId) => prevId + 1);
      })
      .catch((error) => {
        console.error("Error placing order: ", error);
      });
  }

  function dismissOrder(orderId) {
    const orderRef = ref(database, `orders/${orderId}`);
    update(orderRef, { status: false })
      .then(() => {
        console.log("Order dismissed successfully");
      })
      .catch((error) => {
        console.error("Error dismissing order: ", error);
      });
  }

  return (
    <div className=" bg-gray-100 min-h-screen flex flex-col items-center">
      <header className="App-header w-full max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <div className="food-menu mb-8">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Food Menu:</h3>
          {foodItems.map((foodItem) => (
            <div
              className="food-item mb-6 p-5 border border-gray-300 rounded-lg flex flex-col md:flex-row items-center justify-between"
              key={foodItem.id}
            >
              <div className="flex-1 mb-4 md:mb-0">
                <p className="text-xl font-semibold text-gray-800">
                  {foodItem.name}
                </p>
                <p className="text-gray-600">Price: ${foodItem.price}</p>
                <p className="text-gray-600">
                  Time to Make: {formatTime(foodItem.timeToMake)}
                </p>
              </div>
              <div className="quantity-adjuster flex flex-col md:flex-row items-center">
                <div className="flex items-center mb-4 md:mb-0">
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-md mr-2 focus:outline-none"
                    onClick={() => adjustQuantity(foodItem.id, -1)}
                  >
                    -
                  </button>
                  <span className="text-xl">{foodItem.quantity}</span>
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-md ml-2 focus:outline-none"
                    onClick={() => adjustQuantity(foodItem.id, 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded-md ml-0 md:ml-4 focus:outline-none"
                  onClick={() => addToCart(foodItem)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart mb-8">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Cart:</h3>
          {cart.length > 0 ? (
            <div>
              {cart.map((item, index) => (
                <p key={index} className="mb-3 text-gray-800">
                  {item.name} x {item.quantity} - ${item.price * item.quantity}{" "}
                  - {formatTime(item.timeToMake * item.quantity)}
                </p>
              ))}
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                Total: $
                {cart.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0
                )}
              </h4>
              <h4 className="text-xl font-semibold text-gray-800 mb-4">
                Total Time to Make:{" "}
                {formatTime(
                  cart.reduce(
                    (total, item) => total + item.timeToMake * item.quantity,
                    0
                  )
                )}
              </h4>
              <button
                className="bg-blue-600 text-white px-6 py-3 rounded-md focus:outline-none"
                onClick={placeOrder}
              >
                Place Order
              </button>
            </div>
          ) : (
            <p className="text-gray-600">Your cart is empty</p>
          )}
        </div>

        <Link to="/order" className="text-white text-xl">
          Orders
        </Link>
      </header>
    </div>
  );
}

export default App;

function formatTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}
