// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export type Task = {
    id: number;
    assigner: number;
    project_id: number;
    section_id: number;
    order: number;
    content: string;
    description: string;
    completed: boolean;
    label_ids: number[];
    priority: number;
    comment_count: number;
    creator: number;
    created: string;
    due: TaskDue;
    url: String;
};

export type TaskDue = {
    date: string;
    string: string;
    lang: string;
    recurring: boolean;
};

type Data = {
    name: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Task | Task[]>
) {
    const { task, auth } = req.query;

    if (task) {
        const req = await fetch(
            "https://api.todoist.com/rest/v1/tasks/" + task,
            {
                headers: {
                    Authorization: "Bearer " + auth,
                },
            }
        );

        res.json((await req.json()) as Task);
    } else {
        const req = await fetch(
            "https://api.todoist.com/rest/v1/tasks",
            {
                headers: {
                    Authorization: "Bearer " + auth,
                },
            }
        );

        res.json(await req.json() as Task[])
    }
}
