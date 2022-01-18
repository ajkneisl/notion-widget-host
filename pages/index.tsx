import React, {useEffect, useState} from "react"
import styles from "../styles/home.module.scss"
import {CopyToClipboard} from 'react-copy-to-clipboard';

const Index = () => {
    const [todoistValue, setTodoistValue] = useState("https://todoist.com/showTask?id=123456")
    const [todoistAllTask, setTodoistAllTask] = useState("")
    const [todoistAuth, setTodoistAuth] = useState("")

    useEffect(() => {
        let item = localStorage.getItem("todoistAuth")
        setTodoistAuth(item ? item : "")
    }, [])

    useEffect(() => {
        if (todoistAuth !== "")
            localStorage.setItem("todoistAuth", todoistAuth)

        setTodoistAllTask(`https://notion-widget-host.vercel.app/todoist/alltasks?auth=` + todoistAuth)
    }, [todoistAuth])

    const todoistGenerate = () => {
        let content = todoistValue

        if (todoistAuth === "") {
            alert("You must have authentication!")
            return
        }

        if (!content || content === "" || content == null) {

        } else {
            if (content.includes("https://todoist.com/showTask?id=")) {
                content = content?.substring(32)
            }

            setTodoistValue(`https://notion-widget-host.vercel.app/todoist?task=${content}&auth=` + todoistAuth)
        }
    }

    return <div className={styles.container}>
        <div>
            <h2>Todoist</h2>

            <div className={styles.todoistAuth}>
                <p>Todoist API Key</p>
                <input
                    value={todoistAuth}
                    onChange={(newStr) => setTodoistAuth(newStr.target.value)}
                />
            </div>

            <div className={styles.todoistWidgets}>
                <div className={styles.widget}>
                    <div className={styles.widgetHeader}>
                        <h2>Specific Task</h2>
                        <div className={styles.widgetControls}>
                            <button onClick={todoistGenerate}>
                                Generate
                            </button>
                            <CopyToClipboard text={todoistValue} onCopy={() => setTodoistValue("")}>
                                <button>Copy</button>
                            </CopyToClipboard>
                        </div>
                    </div>

                    <textarea className={styles.textArea} onChange={(newStr) => setTodoistValue(newStr.target.value)} value={todoistValue} />
                </div>

                <div className={styles.widget}>
                    <div className={styles.widgetHeader}>
                        <h2>All Tasks</h2>
                        <div className={styles.widgetControls}>
                            <CopyToClipboard text={todoistAllTask}>
                                <button>Copy</button>
                            </CopyToClipboard>
                        </div>
                    </div>

                    <textarea className={styles.textArea} value={todoistAllTask} />
                </div>
            </div>
        </div>
    </div>
}

export default Index
