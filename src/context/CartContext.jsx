import React, { useState, useContext, createContext } from 'react';

export const CartContext = createContext();

//custom hook - hook personalizado
//debe tener "use" delante para que sea un hook personalizado.
//Consumidor
export const useCart = () => {
    const context = useContext(CartContext);
    //Si alguien intenta usarlo fuera del proveedor (CartProvider), lanzará un error.
    if (!context) {
        throw new Error('useCart debe ser usado dentro de un CartProvider');
    }
    return context;
};

//Proveedor
export const CartProvider = ({ children }) => {
    //Dentro, usamos un useState([]) → el carrito arranca vacío o de cero.
    const [cart, setCart] = useState([]);
    // Guarda el cupón aplicado actualmente.
    const [cuponAplicado, setCuponAplicado] = useState(null);
    // Guarda el porcentaje de descuento del cupón.
    const [descuento, setDescuento] = useState(0);

    // Agrega un producto al carrito o aumenta su cantidad si ya existe.
    const addToCart = (product, quantity) => {
        // Busca si el producto ya existe en el carrito.
        const itemInCart = cart.find(item => item.id === product.id);

        if (itemInCart) {
            // Si ya existe, actualiza la cantidad.
            const updatedCart = cart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            );
            setCart(updatedCart);
        } else {
            // Si no existe, lo agrega al carrito.
            setCart(prevCart => [...prevCart, { ...product, quantity }]);
        }
    };

    // Elimina una unidad del producto.
    // Si solo queda una unidad, elimina el producto del carrito.
    const removeFromCart = (id) => {
        const itemInCart = cart.find(item => item.id === id);
        if (!itemInCart) return;

        if (itemInCart.quantity > 1) {
            const updatedCart = cart.map(item =>
                item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            );
            setCart(updatedCart);
        } else {
            setCart(cart.filter(item => item.id !== id));
        }
    };

    // Vacía completamente el carrito.
    const clearCart = () => {
        setCart([]);
        // También quitamos el cupón porque el carrito quedó vacío.
        setCuponAplicado(null);
        setDescuento(0);
    };

    // Cantidad total de productos.
    // Recorre el carrito y suma todas las cantidades para mostrar el número en el ícono 🛒.
    const getCartQuantity = () => {
        return cart.reduce((acc, item) => acc + item.quantity, 0);
    };

    // Precio total del carrito.
    const getCartTotal = () => {
        return cart.reduce((acc, item) => acc + item.precio * item.quantity, 0);
    };

    // Aplica un cupón al carrito.
    // Guarda el código y el porcentaje de descuento.
    const aplicarCupon = (cupon) => {
        setCuponAplicado(cupon.codigo);
        setDescuento(Number(cupon.descuento));
    };

    // Quita el cupón aplicado actualmente.
    const quitarCupon = () => {
        setCuponAplicado(null);
        setDescuento(0);
    };

    // Calcula el total final con el descuento aplicado.
    const getTotalFinal = () => {
        const total = getCartTotal();
        return total - (total * descuento / 100);
    };

    return (
        // Facilita el estado del carrito de forma global, accesible desde cualquier rincón con una sola línea de código.
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                clearCart,
                getCartQuantity,
                getCartTotal,
                // Funciones relacionadas con cupones.
                cuponAplicado,
                descuento,
                aplicarCupon,
                quitarCupon,
                getTotalFinal
            }}
        >
            {/* "Mochila" de herramientas que estás transmitiendo.
            Tanto datos (cart) como funciones para modificarlos
            (addToCart, removeFromCart, clearCart, etc.). */}

            {/* Representa a todos los componentes envueltos por CartProvider.
            Gracias a {children}, todos ellos pueden acceder al carrito. */}
            {children}
        </CartContext.Provider>
    );
};