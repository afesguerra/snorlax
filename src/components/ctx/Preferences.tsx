import {createContext} from "react";

export interface PreferenceProps {
    userId?: string;
    apiToken?: string;
}

export const Preferences = createContext<PreferenceProps>({});