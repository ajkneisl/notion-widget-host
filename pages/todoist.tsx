import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Task } from "./api/todoist";
import styles from "../styles/todoist.module.scss";
import logo from "../public/todoist.png";
import Image from "next/image";

type TaskState = {
    task: Task[] | Task;
    type: "single" | "multiple";
};

export default function Todoist() {
    const [tasks, setTasks] = useState(null as TaskState | null);

    const router = useRouter();
    const { auth, task } = router.query;

    useEffect(() => {
        const loadTasks = async () => {
            if (task) {
                setTasks({
                    task: (await (
                        await fetch(`/api/todoist?auth=${auth}&task=${task}`)
                    ).json()) as Task,
                    type: "single",
                });
            } else {
                setTasks({
                    task: (await (
                        await fetch(`/api/todoist?auth=${auth}`)
                    ).json()) as Task[],
                    type: "multiple",
                });
            }
        };

        loadTasks();
    }, [auth, task]);

    if (tasks !== null) {
        if (tasks.type === "single" && !Array.isArray(tasks.task)) {
            const task = tasks.task as Task;

            return (
                <div className={styles.container}>
                    <div
                        className={
                            styles.todoistContainer +
                            " " +
                            (task.completed
                                ? styles.completed
                                : styles.uncompleted)
                        }
                    >
                        <div>
                            <Image
                                alt="Todoist Logo"
                                src={logo}
                                quality={100}
                                height={17.2}
                                width={63.3}
                            />
                        </div>

                        <p className={styles.todoistContent}>{task.content}</p>

                        {task.description !== "" && (
                            <p className={styles.todoistDescription}>
                                {task.description}
                            </p>
                        )}

                        <p className={styles.dueDate}>{(task?.due?.date ? task.due.date : "no due date")}</p>
                    </div>
                </div>
            );
        } else {
            const task = tasks.task as Task[];
            return (
                <div className={styles.container}>
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

                        <p className={styles.todoistContent}>{task.length} uncompleted tasks.</p>
                    </div>
                </div>
            );
        }
    } else {
        return <>:)</>;
    }
}
