import { OrderTable } from "@/components/OrdersTable";
import React from "react";

const CheifTable = () => {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-center mt-16 mb-8">
        Orders of today
      </h1>
      <OrderTable />
    </div>
  );
};

export default CheifTable;
