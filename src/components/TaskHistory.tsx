import {useContext, useEffect, useState} from "react";
import {Preferences} from "./ctx/Preferences";
import {Header, Spinner} from "@cloudscape-design/components";
import {HabiticaAPI, Task} from "../api/HabiticaAPI";

async function getTasks(userId: string, apiToken: string) {
    const api = new HabiticaAPI({userId, apiToken});
    return await api.getTasks();
}

export const TaskHistory = () => {
    const {apiToken, userId} = useContext(Preferences);
    const [tasks, setTasks] = useState<Task[]>();

    useEffect(() => {
        if (tasks === undefined && userId && apiToken) {
            getTasks(userId, apiToken).then(setTasks);
        }
    }, [tasks, userId, apiToken]);

    if (!(userId && apiToken)) {
        return <Header>Must provide credentials</Header>
    }

    if (tasks === undefined) {
        return <Spinner/>;
    }

    return <pre>{JSON.stringify(tasks, null, 2)}</pre>
}