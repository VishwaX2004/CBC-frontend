export function LoadCart() {
    let cartString = localStorage.getItem("cart");

    if (cartString == null) {
        localStorage.setItem("cart", "[]");
        cartString = "[]";
    }

    const cart = JSON.parse(cartString);
    return cart;
}

export function AddtoCart(product, quantity) {
    let cart = LoadCart();

    const exisitinTitemIndex = cart.findIndex(
        (itme) => {
            return itme.productID == product.productID;
        }
    );

    // FIX: comparison instead of assignment
    if (exisitinTitemIndex == -1) {

        if (quantity < 1) {
            console.log("Quantity must be at least 1");
            return;
        }

        const cartItem = {
            productID: product.productID,
            name: product.name,
            price: product.price,
            labelledPrice: product.labelledPrice,
            quantity: quantity,
            image: product.images ? product.images[0] : product.image
            ,

        };

        cart.push(cartItem);

    } else {

        // FIX: correct array access
        const exisitingitem = cart[exisitinTitemIndex];

        const newQuantity = exisitingitem.quantity + quantity;

        if (newQuantity < 1) {

            // FIX: filter + comparison
            cart = cart.filter(
                (itme) => {
                    return itme.productID != product.productID;
                }
            );

        } else {
            // FIX: correct index usage
            cart[exisitinTitemIndex].quantity = newQuantity;
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
}


export function GetTotal() {

    let cart = LoadCart()

    let total = 0

    cart.forEach(
        (item) => {
            total += item.price * item.quantity
        }
    )

    return total
}