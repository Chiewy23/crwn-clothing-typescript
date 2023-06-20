import { SpinnerContainer, SpinnerOverlay } from "./spinner.styles";

const Spinner = () => {
    return (
        <SpinnerOverlay data-test-id="spinner">
            <SpinnerContainer />
        </SpinnerOverlay>
    );
};

export default Spinner;