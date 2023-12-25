import { ActionFunctionArgs, Form, redirect, useActionData } from 'react-router-dom'
import { ActionData, Comment } from '../types'
import classes from './Comment.module.css'
import auth from '../lib/auth'

export const action = async (args: ActionFunctionArgs) => {
  const { postId, commentId } = args.params
  // const formData = await args.request.formData()

  // const vote = formData.get('delete-comment')

  // const path = vote

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

  return (
    <div className={classes.comment}>
      <div className={classes.commentInfo}>
        <p className={classes.commentAuthor}>{comment.author.userName}</p>
        <Form method="delete" action={`/posts/${postId}/comments/${comment._id}`}>
            {error && <p><b>Error:</b> {error.message}</p>}
            <input type="hidden" name="delete-comment" id='delete-comment' />
            <button type="submit">Delete comment</button>
          </Form>

      </div>
      <p className={classes.commentBody}>{comment.body}</p>
    </div>
  )
}