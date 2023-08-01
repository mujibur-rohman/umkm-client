import { useEffect, useState } from "react";

function useCart() {
  const [cart, setCart] = useState();
  useEffect(() => {
    if (localStorage.getItem("cart")) {
      setCart(JSON.parse(localStorage.getItem("cart")));
    }
  }, [setCart]);
  return { cart, setCart };
}

export default useCart;
