import { CartItemContainer, Image, ItemDetails, Name, Price} from "./cart-item.styles";
import { CartItemExtension } from "../../store/cart/cart.types";
import { FC } from "react";

type CartItemProps = {
    cartItem: CartItemExtension;
};

const CartItem: FC<CartItemProps> = ({ cartItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;
    return (
        <CartItemContainer>
            <Image src={ imageUrl } alt={ name } />
            <ItemDetails>
                <Name>{ name }</Name>
                <Price>{ quantity } x { price }</Price>
            </ItemDetails>
        </CartItemContainer>
    );
};

export default CartItem;