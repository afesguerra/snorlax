import {createContext} from "react";

export interface PreferenceProps {
    apiKey?: string
}

export const Preferences = createContext<PreferenceProps>({});