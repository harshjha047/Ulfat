import { useCart } from '../../Context/CartContext';

function CartSummary() {
      let {cartData, totalPrice } = useCart();
  console.log(cartData);
  

      

  return (<>
         {/* <!-- Order Summary --> */}
      
        <div className="bg-gray-100 rounded-lg p-6 sticky top-[14vh] ">
          <h3 className="text-xl font-bold text-[black] mb-6">Order Summary</h3>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal ({cartData?.length} items)</span>
              <span>₹{totalPrice}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Tax</span>
              <span>₹{0.05*totalPrice}</span>
            </div>
            <hr className="border-gray-600"/>
            <div className="flex justify-between text-xl font-bold text-[black]">
              <span>Total</span>
              <span>₹{totalPrice+(0.05*totalPrice)}</span>
            </div>
          </div>
    <button
      className="w-full bg-blue-600 text-[#ffffff] py-3 rounded-lg font-semibold hover:bg-blue-700 mb-4"
    >
      Proceed to Checkout
    </button>
        </div>
      
      
      </>
  )
}

export default CartSummary