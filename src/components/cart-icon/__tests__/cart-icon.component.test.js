import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../../utilities/test/test.utils";
import CartIcon from "../cart-icon.component";

describe("Cart Icon tests", () => {
    test("Uses preloaded state to render", () => {
        const initialCartItems = [
            { id: 1, name: "Item A", imageUrl: "test", price: 10, quantity: 1 }
        ];

        renderWithProviders(<CartIcon />, {
            preloadedState: {
                cart: { cartItems: initialCartItems }
            }
        });

        const cartIconElement = screen.getByText("1");

        expect(cartIconElement).toBeInTheDocument();
    });
});