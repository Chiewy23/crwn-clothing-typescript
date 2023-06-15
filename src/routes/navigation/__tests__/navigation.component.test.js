import { render, screen } from "@testing-library/react";
import Navigation from "../navigation.component";
import { renderWithProviders } from "../../../utilities/test/test.utils";


describe("Navigation tests", () => {
    test("It should render a Sign In link if no currentUder", () => {
        renderWithProviders(<Navigation />, {
            preloadedState: {
                user: {
                    currentUser: null
                }
            }
        })

        const signInLinkElement = screen.getByText(/sign in/i);

        expect(signInLinkElement).toBeInTheDocument();
    });
});