import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import api from "../api/client";

const CartPage = () => {
  const { cart, updateItem, removeItem, clearCart, totalPrice } = useCart();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!cart.items || cart.items.length === 0) {
      alert("Cart is empty");
      return;
    }
    const items = cart.items.map((i) => ({
      product: i.product._id,
      quantity: i.quantity,
      price: i.product.price
    }));
    await api.post("/orders", { items, totalPrice });
    await clearCart();
    alert("Order placed");
    navigate("/orders");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 animate-fadeIn">
      <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
      {(!cart.items || cart.items.length === 0) && (
        <div className="bg-white rounded-lg border border-dashed border-slate-200 px-4 py-10 text-center text-sm text-slate-500">
          Your cart is empty. Start exploring deals and add products to your
          cart.
        </div>
      )}
      {cart.items && cart.items.length > 0 && (
        <>
          <div className="space-y-3">
            {cart.items.map((item) => (
              <div
                key={item.product._id}
                className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm"
              >
                <img
                  src={`http://localhost:5000${item.product.imageUrl}`}
                  alt={item.product.name}
                  className="w-20 h-20 object-contain rounded bg-slate-50"
                />
                <div className="flex-1">
                  <p className="font-semibold text-sm text-slate-900">
                    {item.product.name}
                  </p>
                  <p className="text-xs text-slate-500 mb-1">
                    {item.product.category}
                  </p>
                  <p className="text-sm font-medium text-[#B12704]">
                    ${item.product.price.toFixed(2)}
                  </p>
                </div>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    updateItem(
                      item.product._id,
                      Number(e.target.value || 1)
                    )
                  }
                  className="w-16 border border-slate-300 rounded px-2 py-1 text-sm"
                />
                <button
                  onClick={() => removeItem(item.product._id)}
                  className="text-xs text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white rounded-lg shadow-sm px-4 py-3">
            <div>
              <p className="text-sm text-slate-600">Subtotal</p>
              <p className="text-xl font-semibold text-slate-900">
                ${totalPrice.toFixed(2)}
              </p>
              <p className="text-[11px] text-slate-500">
                Taxes and shipping calculated at checkout.
              </p>
            </div>
            <button
              onClick={handleCheckout}
              className="px-5 py-2 bg-[#FF9900] text-black rounded-full text-sm font-semibold hover:bg-[#f9a825] transition-colors w-full sm:w-auto"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
