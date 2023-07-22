import {useContext, useEffect, useState} from "react";
import {Spinner} from "@cloudscape-design/components";
import {API, Task} from "../api/HabiticaAPI";

export const TaskHistory = () => {
    const [tasks, setTasks] = useState<Task[]>();
    const api = useContext(API);

    useEffect(() => {
        if (tasks === undefined) {
            api?.getTasks().then(setTasks);
        }
    }, [tasks, api]);

    if (tasks === undefined) {
        return <Spinner/>;
    }

    return <pre>{JSON.stringify(tasks, null, 2)}</pre>
}