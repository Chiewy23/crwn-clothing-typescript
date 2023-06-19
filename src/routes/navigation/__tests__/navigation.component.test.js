import { fireEvent, render, screen } from "@testing-library/react";
import Navigation from "../navigation.component";
import { renderWithProviders } from "../../../utilities/test/test.utils";
import { signOutStart } from "../../../store/user/user.action";


const mockedDispatch = jest.fn();
     
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockedDispatch,
}));


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

    test("it should not render a cart dropdown if isCartOpen is false", () => {
        renderWithProviders(<Navigation />, {
            preloadedState: {
                cart: {
                    isCartOpen: false,
                    cartItems: []
                }
            }
        })

        const dropdownTextElement = screen.queryByText(/Your cart is empty/);

        expect(dropdownTextElement).toBeNull();
    });

    test("it should render a cart dropdown if isCartOpen is true", () => {
        renderWithProviders(<Navigation />, {
            preloadedState: {
                cart: {
                    isCartOpen: true,
                    cartItems: []
                }
            }
        })

        const dropdownTextElement = screen.queryByText(/Your cart is empty/i);

        expect(dropdownTextElement).toBeInTheDocument();
    });

    test("it should dispatch signOutStart action when clicking Sign Out link", async () => {

        renderWithProviders(<Navigation />, {
            preloadedState: {
                user: {
                    currentUser: {}
                }
            }
        });

        const signOutLinkElement = screen.getByText(/sign out/i);
        expect(signOutLinkElement).toBeInTheDocument();

        await fireEvent.click(signOutLinkElement);
        expect(mockedDispatch).toHaveBeenCalled();
        expect(mockedDispatch).toHaveBeenCalledWith(signOutStart());
        mockedDispatch.mockClear();
    })
});