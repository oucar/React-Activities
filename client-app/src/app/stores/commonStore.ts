import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../models/serverError";

export default class CommonStore {
    error: ServerError | null = null;
    // assign token to null if it is not in local storage
    token: string | null = localStorage.getItem('jwt');
    appLoaded = false;
    
    constructor() {
        makeAutoObservable(this);

        // reaction is a MobX function that allows us to react to changes in observables
        // in this case, we are reacting to changes in the token observable
        // if the token changes, we will either set it in local storage or remove it
        reaction(
            () => this.token,
            token => {
                if (token) {
                    localStorage.setItem('jwt', token)
                } else {
                    localStorage.removeItem('jwt')
                }
            }
        )
    }

    setServerError(error: ServerError) {
        this.error = error;
    }

    setToken = (token: string | null) => {
        this.token = token;
    }

    setAppLoaded = () => {
        this.appLoaded = true;
    }
}