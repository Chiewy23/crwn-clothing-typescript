import { AnyAction } from "redux";
import { UserData } from "../../utilities/firebase/firebase.utils";
import { 
    signInFailure,
    signUpFailure,
    signOutFailure,
    signOutSuccess,
    signInSuccess,
    signUpSuccess
} from "./user.action";


export type UserState = {
    readonly currentUser: UserData | null;
    readonly isLoading: boolean;
    readonly error: Error | null;
};

const INITIAL_STATE: UserState = {
    currentUser: null,
    isLoading: false,
    error: null
};

export const userReducer = (state = INITIAL_STATE, action: AnyAction) => {

    if (signInSuccess.match(action)) {
        return {...state, currentUser: action.payload };
    }

    if (signOutSuccess.match(action)) {
        return { ...state, currentUser: null };
    }

    if (signUpSuccess.match(action)) {
        return { ...state, currentUser: action.payload };
    }
    
    if (signOutFailure.match(action) || signInFailure.match(action) || signUpFailure.match(action)) {
        return {...state, error: action.payload };
    }

    return state;
};