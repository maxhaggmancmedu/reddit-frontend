import { ActionFunctionArgs, Form, redirect, useActionData } from "react-router-dom";
import classes from './EditPost.module.css'
import { ActionData, Post } from "../types";
import auth from "../lib/auth";

export const action = async ({ request, params }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const id = params.id

    const postData = Object.fromEntries(formData.entries());

    const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/posts/' + id + '/edit', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.getJWT()}`,
        },
        body: JSON.stringify(postData),
    });

    if (!response.ok) {
        const { message } = await response.json();

        return { message };
    }

    return redirect('/posts/' + id)
}

export default function EditPost({ post }: { post: Post }) {
    const error = useActionData() as ActionData;

    return (
        <Form method="PUT" className={classes.form} action={`/posts/${post._id}/edit`}>
            {error && <p><b>Error:</b> {error.message}</p>}
            <div className={classes.formGroup}>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="title" placeholder={post.title} required />
            </div>
            <div className={classes.formGroup}>
                <label htmlFor="link">Link (optional)</label>
                <input type="text" name="link" id="link" placeholder={post.link} />
            </div>
            <div className={classes.formGroup}>
                <label htmlFor="body">Body (optional)</label>
                <textarea name="body" id="body" placeholder='New text' />
            </div>
            <div className={classes.formGroup}>
                <button type="submit">Edit post</button>
            </div>
        </Form>
    )
}