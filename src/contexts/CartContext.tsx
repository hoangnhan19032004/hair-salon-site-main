// src/contexts/CartContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from 'react';
import axios from 'axios';

export interface CartProduct {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image?: string;
  quantity: number;
}

interface CartContextType {
  cart: CartProduct[];
  addToCart: (p: Omit<CartProduct,'quantity'>) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, qty: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType|undefined>(undefined);

export const CartProvider: React.FC<{children:ReactNode}> = ({ children }) => {
  const [cart, setCart] = useState<CartProduct[]>([]);
  // lấy token JWT từ localStorage
  const [token, setToken] = useState<string|null>(localStorage.getItem('token'));
  const loggedIn = Boolean(token);
  const localKey = 'cart';

  // 1) Lắng nghe khi user login/logout
  useEffect(() => {
    const onLoginChange = () => {
      setToken(localStorage.getItem('token'));
    };
    window.addEventListener('loginStatusChange', onLoginChange);
    return () => window.removeEventListener('loginStatusChange', onLoginChange);
  }, []);

  // 2) Khi token hoặc loggedIn đổi → load cart
  useEffect(() => {
    if (loggedIn) {
      axios.get<CartProduct[]>('/api/cart', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(r => setCart(r.data))
      .catch(err => {
        console.error('Không lấy được cart từ server:', err);
        // fallback: load guest
        const j = localStorage.getItem(localKey);
        if (j) try { setCart(JSON.parse(j)); } catch {
          // intentionally ignore JSON parse errors
        }
      });
    } else {
      // guest: load localStorage
      const j = localStorage.getItem(localKey);
      if (j) try { setCart(JSON.parse(j)); } catch {
        // intentionally ignore JSON parse errors
      }
    }
  }, [loggedIn, token]);

  // 3) Mỗi khi cart thay đổi → luôn lưu localStorage, + nếu login thì sync server
  useEffect(() => {
    localStorage.setItem(localKey, JSON.stringify(cart));
    if (loggedIn) {
      axios.put('/api/cart', cart, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .catch(err => console.error('Không lưu được cart lên server:', err));
    }
  }, [cart, loggedIn, token]);

  // các thao tác trên cart
  const addToCart = (p: Omit<CartProduct,'quantity'>) => {
    setCart(prev => {
      const i = prev.findIndex(x=>x.id===p.id);
      if (i>=0) {
        const next = [...prev];
        next[i].quantity++;
        return next;
      }
      return [...prev,{...p,quantity:1}];
    });
  };
  const removeFromCart = (id: number) => setCart(prev=>prev.filter(x=>x.id!==id));
  const updateQuantity = (id:number,qty:number) => {
    if (qty<=0) return removeFromCart(id);
    setCart(prev=>prev.map(x=>x.id===id?{...x,quantity:qty}:x));
  };
  const clearCart = () => setCart([]);

  const getTotalItems = () => cart.reduce((s,x)=>s+x.quantity,0);
  const getTotalPrice = () => cart.reduce((s,x)=>s+x.price*x.quantity,0);

  return (
    <CartContext.Provider value={{
      cart, addToCart, removeFromCart,
      updateQuantity, clearCart,
      getTotalItems, getTotalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be inside CartProvider');
  return ctx;
};
