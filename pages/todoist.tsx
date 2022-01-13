import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Task } from "./api/todoist";
import styles from "../styles/todoist.module.scss";
import logo from "../public/todoist.png";
import Image from "next/image";

export default function Todoist() {
    const [tasks, setTasks] = useState([] as Task[]);
    const router = useRouter();
    const { auth, task } = router.query;

    useEffect(() => {
        const loadTasks = async () => {
            setTasks(
                (await (
                    await fetch(`/api/todoist?auth=${auth}`)
                ).json()) as Task[]
            );
        };

        loadTasks();
    }, [auth]);

    if (task) {
        return <></>;
    } else {
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

                    {tasks.length}
                </div>
            </div>
        );
    }
}
