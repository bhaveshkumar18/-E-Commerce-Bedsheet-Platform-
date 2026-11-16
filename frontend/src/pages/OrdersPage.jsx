import { useEffect, useState } from "react";
import api from "../api/client";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const { data } = await api.get("/orders/my");
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 animate-fadeIn">
      <h1 className="text-2xl font-semibold mb-4">Your Orders</h1>
      {orders.length === 0 && (
        <div className="bg-white rounded-lg border border-dashed border-slate-200 px-4 py-10 text-center text-sm text-slate-500">
          You haven&apos;t placed any orders yet.
        </div>
      )}
      <div className="space-y-3">
        {orders.map((o) => (
          <div key={o._id} className="bg-white p-3 rounded-lg shadow-sm">
            <div className="flex justify-between mb-2 text-xs sm:text-sm">
              <span className="text-slate-600">
                Order ID:{" "}
                <span className="font-mono text-[11px] sm:text-xs">
                  {o._id}
                </span>
              </span>
              <span className="capitalize text-xs font-medium text-slate-700">
                {o.status}
              </span>
            </div>
            <ul className="text-xs sm:text-sm mb-2 text-slate-700">
              {o.items.map((item, idx) => (
                <li key={idx}>
                  {item.product?.name} × {item.quantity} (${item.price})
                </li>
              ))}
            </ul>
            <p className="font-semibold text-sm text-slate-900">
              Total: ${o.totalPrice.toFixed(2)}
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              {new Date(o.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
