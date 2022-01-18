import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Task } from "../api/todoist";
import styles from "../../styles/todoist.module.scss";
import logo from "../../public/todoist.png";
import Image from "next/image";
import ReactMarkdown from 'react-markdown'

export default function Index() {
    const [taskData, setTaskData] = useState(null as Task | null);

    const router = useRouter();
    const { auth, task } = router.query;

    useEffect(() => {
        const loadTasks = async () => {
            let fetchData = (await (
                await fetch(`/api/todoist?auth=${auth}&task=${task}`)
            ).json()) as Task

            setTaskData(fetchData)
        };

        loadTasks();
    }, [auth, task]);

    if (taskData) {
        return <div className={styles.container}>
            <div
                className={
                    styles.todoistContainer +
                    " " +
                    (taskData.completed
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

                <ReactMarkdown className={styles.todoistContent}>{taskData.content}</ReactMarkdown>

                {taskData.description !== "" && (
                    <ReactMarkdown className={styles.todoistDescription}>
                        {taskData.description}
                    </ReactMarkdown>
                )}

                <ReactMarkdown className={styles.dueDate}>{(taskData?.due?.date ? taskData.due.date : "no due date")}</ReactMarkdown>
            </div>
        </div>
    } else {
        return <>:)</>;
    }
}
