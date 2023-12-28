import { ActionFunctionArgs, redirect, useFetcher } from "react-router-dom";
import classes from './EditComment.module.css'
import { useRef } from "react";
import { Comment } from '../types'
import auth from "../lib/auth";

export const action = async ({ request, params }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const { postId, commentId } = params
    const postData = Object.fromEntries(formData.entries());

    const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/posts/' + postId + '/comments/' + commentId + '/edit', {
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

    return redirect('/posts/' + postId)
}

export default function EditComment({ comment, postId }: {comment: Comment, postId: string}) {

    const fetcher = useFetcher({ key: 'comment-form-' + postId + comment._id })
    const textRef = useRef<HTMLTextAreaElement>(null)

    if (textRef.current && fetcher.state === 'loading') {
        textRef.current.value = ''
    }

    return (
        <fetcher.Form method="PUT" className={classes.form} action={`/posts/${postId}/comments/${comment._id}/edit`}>
            <div className={classes.formGroup}>
                <textarea ref={textRef} name="body" placeholder={comment.body} id="body"required />
            </div>
            <div className={classes.formGroup}>
                <button type="submit">Edit comment</button>
            </div>
        </fetcher.Form>
    )
}