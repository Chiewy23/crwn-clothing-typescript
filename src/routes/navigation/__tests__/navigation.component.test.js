import { render, screen } from "@testing-library/react";
import Navigation from "../navigation.component";
import { renderWithProviders } from "../../../utilities/test/test.utils";


describe("Navigation tests", () => {
    test("It should render a Sign In link if no currentUser", () => {
        renderWithProviders(<Navigation />, {
            preloadedState: {
                user: {
                    currentUser: null
                }
            }
        })

        const signInLinkElement = screen.getByText(/sign in/i);
        expect(signInLinkElement).toBeInTheDocument();

        const signOutLinkElement = screen.queryByText(/sign out/i);
        expect(signOutLinkElement).toBeNull();
    });

    test("It should render a Sign Out link if currentUser", () => {
        renderWithProviders(<Navigation />, {
            preloadedState: {
                user: {
                    currentUser: {
                        currentUser: {}
                    }
                }
            }
        })

        const signOutLinkElement = screen.getByText(/sign out/i);
        expect(signOutLinkElement).toBeInTheDocument();

        const signInLinkElement = screen.queryByText(/sign in/i);
        expect(signInLinkElement).toBeNull();
    });
});