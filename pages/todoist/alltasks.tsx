import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Task } from "../api/todoist";
import styles from "../../styles/todoist.module.scss";
import logo from "../../public/todoist.png";
import Image from "next/image";
import {useDecoder, Config} from "../../src/util";

export type AllTasksQuery = {
    auth: string,
    project?: string
}

export default function Alltasks() {
    const router = useRouter();
    const { val } = router.query;

    const { backgroundColor, queryParameters: { auth, project } } = useDecoder<AllTasksQuery>(val as string)

    const [tasks, setTasks] = useState([] as Task[]);

    useEffect(() => {
        if (auth) {
            const loadTasks = async () => {
                const task = await (
                    await fetch(`/api/todoist?auth=${auth}` + (project ? `&project=${project}` : ""))
                ).json()

                setTasks(task as Task[]);
            };

            loadTasks();
        }
    }, [auth, project]);

    if (tasks.length !== 0) {
        return <div className={styles.container}>
            <div className={styles.todoistContainer}>
                <div>
                    <Image
                        alt="Todoist Logo"
                        src={logo}
                        quality={100}
                        height={17.2}
                        width={63.3}
                    />
                </div>

                <p className={styles.todoistContent}>{tasks.length} uncompleted tasks.</p>
            </div>
        </div>
    } else {
        return <>Loading...</>;
    }
}
