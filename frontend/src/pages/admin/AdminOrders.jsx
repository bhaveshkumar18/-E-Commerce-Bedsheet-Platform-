import { useEffect, useState } from "react";
import api from "../../api/client";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const { data } = await api.get("/orders");
    setOrders(data);
  };

  const updateStatus = async (id, status) => {
    await api.put(`/orders/${id}/status`, { status });
    fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const statuses = [
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled"
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 animate-fadeIn">
      <h1 className="text-2xl font-semibold mb-4">All Orders</h1>
      <div className="space-y-3">
        {orders.map((o) => (
          <div key={o._id} className="bg-white p-3 rounded-lg shadow-sm">
            <div className="flex justify-between text-xs sm:text-sm mb-2">
              <span className="text-slate-700">
                {o.user?.name}{" "}
                <span className="text-slate-500">({o.user?.email})</span>
              </span>
              <span className="font-mono text-[11px]">
                {o._id}
              </span>
            </div>
            <ul className="text-xs sm:text-sm mb-2 text-slate-700">
              {o.items.map((item, idx) => (
                <li key={idx}>
                  {item.product?.name} × {item.quantity} (${item.price})
                </li>
              ))}
            </ul>
            <p className="font-semibold text-sm text-slate-900 mb-2">
              Total: ${o.totalPrice.toFixed(2)}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm">Status:</span>
              <select
                value={o.status}
                onChange={(e) => updateStatus(o._id, e.target.value)}
                className="border border-slate-300 rounded px-2 py-1 text-xs sm:text-sm"
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;
