export function LoadCart(){

    let cartString = localStorage.getItem("cart")

    if(cartString==null){
        localStorage.setItem("cart","[]")

        cartString = "[]"
    }

    const cart = JSON.parse(cartString)

    return cart

}

export function AddtoCart(product,quantity){

        let cart = LoadCart()

        const exisitinTitemIndex = cart.findIndex(
                (itme)=>{
                        return itme.productID == product.productID
                }
        )

        if(exisitinTitemIndex=-1){

            if(quantity<1){
                console.log("Quantity must be at least 1")
                return
            }

            const cartItem ={
                productID : product.productID,
                name : product.name,
                price : product.price,
                laballedPrice : product.laballedPrice,
                quantity : quantity,
                image : product.images[0]
            }

            cart.push(cartItem)
            
        }else{

            const exisitingitem = cart(exisitinTitemIndex)

            const newQuantity = exisitingitem.quantity + quantity

            if(newQuantity<1){

                cart = cart.fillter(
                    (itme)=>{
                        return itme.productID = product.productID
                    }
                )

            }else{
               cart[exisitingitem].quantity = newQuantity
            }
        }


        localStorage.setItem("cart", JSON.stringify(cart))

}