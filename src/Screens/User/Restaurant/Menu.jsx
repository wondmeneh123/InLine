import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ShoppingCart, Coffee, Utensils, Package } from "lucide-react";
import Beef from "../../../assets//beef-burge.png";
import Patty from "../../../assets/patty-burger.png";
import Royal from "../../../assets/royal-burger.png";

const menuItems = {
  burgers: [
    { name: "Cheeseburger", price: 599, url: Beef },
    { name: "Double Patty Burger", price: 799, url: Patty },
    { name: "Vegan Burger", price: 649, url: Patty },
    { name: "Cheeseburger", price: 599, url: Beef },
    { name: "Double Patty Burger", price: 799, url: Royal },
    { name: "Vegan Burger", price: 649, url: Royal },
    { name: "Cheeseburger", price: 599, url: Royal },
    { name: "Double Patty Burger", price: 799, url: Royal },
    { name: "Vegan Burger", price: 649, url: Royal },
    { name: "Cheeseburger", price: 599, url: Royal },
    { name: "Double Patty Burger", price: 799, url: Royal },
    { name: "Vegan Burger", price: 649, url: Royal },
    { name: "Cheeseburger", price: 599, url: Royal },
    { name: "Double Patty Burger", price: 799, url: Royal },
    { name: "Vegan Burger", price: 649, url: Royal },
    { name: "Cheeseburger", price: 599, url: Royal },
    { name: "Double Patty Burger", price: 799, url: Royal },
    { name: "Vegan Burger", price: 649, url: Royal },
  ],
  beverages: [
    { name: "Coke", price: 199 },
    { name: "Lemonade", price: 249 },
    { name: "Iced Coffee", price: 399 },
  ],
  extras: [
    { name: "Fries", price: 299 },
    { name: "Onion Rings", price: 349 },
    { name: "Mozzarella Sticks", price: 449 },
  ],
  takeaway: [
    { name: "Paper Bag", price: 50 },
    { name: "Plastic Box", price: 100 },
    { name: "Reusable Container", price: 200 },
  ],
};

const formatPrice = (price) => new Intl.NumberFormat("en-US").format(price);

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("burgers");
  const [quantities, setQuantities] = useState({});
  const [showDialog, setShowDialog] = useState(false);

  const adjustQuantity = (itemName, change) => {
    setQuantities((prev) => ({
      ...prev,
      [itemName]: Math.max((prev[itemName] || 0) + change, 0),
    }));
  };

  const totalPrice = Object.entries(quantities).reduce(
    (acc, [item, qty]) =>
      acc +
      qty *
        (menuItems[selectedCategory].find((i) => i.name === item)?.price || 0),
    0
  );

  return (
    <div className="  ">
      <header className="text-center mb-6 fixed bg-white flex flex-col justify-center items-center w-full max-w-screen p-6">
        <h1 className="text-4xl font-bold">Boss Burger</h1>
        <p className="text-lg text-gray-700">
          Delicious meals and beverages await!
        </p>
      </header>
      <div className="max-w-3xl w-full  p-6  mx-auto">
        <Tabs
          defaultValue="burgers"
          onValueChange={setSelectedCategory}
          className="mt-24"
        >
          <TabsList className="grid grid-cols-4 gap-2">
            <TabsTrigger value="burgers">
              <Utensils className="mr-2" />
              Food
            </TabsTrigger>
            <TabsTrigger value="beverages">
              <Coffee className="mr-2" />
              Beverages
            </TabsTrigger>
            <TabsTrigger value="extras">
              <ShoppingCart className="mr-2" />
              Extras
            </TabsTrigger>
            <TabsTrigger value="takeaway">
              <Package className="mr-2" />
              Takeaway
            </TabsTrigger>
          </TabsList>

          {Object.keys(menuItems).map((category) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {menuItems[category].map((item, index) => (
                  <Card
                    key={index}
                    className="bg-white text-gray-900 shadow-md rounded-lg"
                  >
                    <CardHeader>
                      <img
                        src={item.url}
                        alt={item.name}
                        className="w-full h-32 object-cover rounded-t-lg"
                      />
                      <CardTitle>{item.name}</CardTitle>
                    </CardHeader>

                    <CardContent className="flex justify-between items-center">
                      <span className="text-lg font-semibold">
                        {formatPrice(item.price)} Br
                      </span>
                      <div className="flex items-center gap-2">
                        <Button onClick={() => adjustQuantity(item.name, -1)}>
                          -
                        </Button>
                        <span>{quantities[item.name] || 0}</span>
                        <Button onClick={() => adjustQuantity(item.name, 1)}>
                          +
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="flex justify-center mt-6">
          <Button
            className="bg-green-600 text-white px-6 py-3 text-lg rounded-full shadow-lg"
            onClick={() => setShowDialog(true)}
          >
            Place Order
          </Button>
        </div>

        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="bg-white text-gray-900 rounded-lg shadow-xl p-6">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                Your order is sent
              </DialogTitle>
            </DialogHeader>
            <ul className="mb-4">
              {Object.entries(quantities).map(([item, qty]) =>
                qty > 0 ? (
                  <li key={item} className="flex justify-between border-b py-2">
                    <span>{item}</span>
                    <span>
                      {qty} x{" "}
                      {formatPrice(
                        menuItems[selectedCategory].find((i) => i.name === item)
                          ?.price
                      )}{" "}
                      Br
                    </span>
                  </li>
                ) : null
              )}
            </ul>
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>{formatPrice(totalPrice)} Br</span>
            </div>
            <h1 className=" font-bold text-3xl text-center">
              <span className="text-lg font-normal my-4">
                Estimated arrival time
              </span>
              <br />
              02:45 PM
            </h1>
            <p className="text-center">Thanks for mealing with us!</p>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Menu;
