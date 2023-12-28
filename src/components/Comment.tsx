import { ActionFunctionArgs, Form, redirect, useActionData } from 'react-router-dom'
import { ActionData, Comment } from '../types'
import classes from './Comment.module.css'
import auth from '../lib/auth'
import { useState } from 'react'
import EditComment from './EditComment'

export const action = async (args: ActionFunctionArgs) => {
  const { postId, commentId } = args.params

  const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/posts/' + postId + '/comments/' + commentId, {
      headers: {
          'Authorization': `Bearer ${auth.getJWT()}`
      },
      method: 'DELETE'
  })

  if (!response.ok) {
      const { message } = await response.json()
      return { message }
  }

  return redirect(`/posts/${postId}`)

}

export default function CommentComponent({ comment, postId }: {comment: Comment, postId: string}) {
  const error = useActionData() as ActionData;
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className={classes.comment}>
      <div className={classes.commentInfo}>
        <p className={classes.commentAuthor}>{comment.author.userName}</p>
        <div className={classes.buttons}>
          {isOpen && <div onClick={() => setIsOpen(false)} className={classes.backgroundClick} />}
          {isOpen && <EditComment postId={postId} comment={comment} />}
          <button className={classes.button} onClick={() => setIsOpen(true)}>Edit comment</button>
          <Form method="delete" action={`/posts/${postId}/comments/${comment._id}`}>
              {error && <p><b>Error:</b> {error.message}</p>}
              <input type="hidden" name="delete-comment" id='delete-comment' />
              <button className={classes.button} type="submit">Delete comment</button>
            </Form>

        </div>

      </div>
      <p className={classes.commentBody}>{comment.body}</p>
    </div>
  )
}