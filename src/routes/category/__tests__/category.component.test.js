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

        const spinnerElement = screen.findByTestId("spinner");

        expect(spinnerElement).toBeInTheDocument();
    });
});