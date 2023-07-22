import axios, {AxiosRequestConfig} from "axios";
import {createContext} from "react";

export type DaysOfWeek = "m" | "t" | "w" | "th" | "f" | "s" | "su";

export interface Reminder {

}

export interface Task {
    readonly _id: string;
    readonly alias?: string;
    readonly attribute: string;
    readonly challenge: {};
    readonly checklist?: [];
    readonly collapseChecklist?: boolean;
    readonly completed?: boolean;
    readonly createdAt: string;
    readonly everyX?: number;
    readonly frequency?: string;
    readonly group: {};
    readonly id: string;
    readonly notes: string;
    readonly priority: number;
    readonly reminders: Reminder[];
    readonly repeat?: { [p in DaysOfWeek]: boolean };
    readonly startDate?: string;
    readonly streak?: number;
    readonly tags: [];
    readonly text: string;
    readonly type: string;
    readonly updatedAt: string;
    readonly userId: string;
    readonly value: number;
}

interface GetTasksResponse {
    readonly success: boolean;
    readonly data: Task[];
    readonly notifications: any[];
}

export interface HabiticaAPIProps {
    readonly userId: string;
    readonly apiToken: string;
}

export class HabiticaAPI {
    private readonly defaultConfig: AxiosRequestConfig;

    constructor({userId, apiToken}: HabiticaAPIProps) {
        this.defaultConfig = {
            baseURL: 'https://habitica.com/api/v3',
            headers: {
                'x-client': '84dd3cb4-ad47-48da-b195-9b18df60265c-Snorlax',
                'x-api-user': userId,
                'x-api-key': apiToken,
            }
        }
    }

    async getTasks(): Promise<Task[]> {
        const {data} = await axios.get<GetTasksResponse>(`/tasks/user`, this.defaultConfig);
        return data.data;
    }
}

export const API = createContext<HabiticaAPI>(new HabiticaAPI({
    apiToken: "",
    userId: ""
}));
