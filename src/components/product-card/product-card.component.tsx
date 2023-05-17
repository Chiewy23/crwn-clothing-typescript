import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
import { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { CartItem } from "../../store/cart/cart.types";
import { FC } from "react";

import { 
    ProductCardContainer,
    ProductCardImage,
    ProductCardFooter,
    ProductCardButton 
} from "./product-card.styles";

type ProductCardProps = {
    product: CartItem;
};

const ProductCard: FC<ProductCardProps> = ({ product }) => {
    const { name, price, imageUrl } = product;
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

    return (
        <ProductCardContainer>
            <ProductCardImage src={imageUrl} alt={`${name}`} />
            <ProductCardFooter>
                <span className="name">{ name }</span>
                <span className="price">{ price }</span>
            </ProductCardFooter>

            <ProductCardButton buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add to cart</ProductCardButton>
        </ProductCardContainer>
    );
};

export default ProductCard;