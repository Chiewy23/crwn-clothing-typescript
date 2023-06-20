import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../../utilities/test/test.utils";

import Category from "../category.component";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: () => ({
        category: "mens"
    })
}));

describe("category tests", () => {
    test("it should render a Spinner if isLoading is true", () => {
        renderWithProviders(<Category />, {
            preloadedState: {
                categories: {
                    isLoading: true,
                    categories: []
                }
            }
        })

        const spinnerElement = screen.getByTestId("spinner");

        expect(spinnerElement).toBeInTheDocument();
    });

    test("it should not render a Spinner if isLoading is false", () => {
        renderWithProviders(<Category />, {
            preloadedState: {
                categories: {
                    isLoading: false,
                    categories: []
                }
            }
        })

        const spinnerElement = screen.queryByTestId("spinner");

        expect(spinnerElement).toBeNull();
    });

    test("it should render products if isLoading is false", () => {
        renderWithProviders(<Category />, {
            preloadedState: {
                categories: {
                    isLoading: false,
                    categories: [{ title: 'mens', items: [
                        { id: 1, name: "Product 1" },
                        { id: 2, name: "Product 2" }
                    ]}]
                }
            }
        })

        const product1Element = screen.getByText(/product 1/i);

        expect(product1Element).toBeInTheDocument();
    });
});