import { Comment } from '../types'
import classes from './Comment.module.css'

export default function CommentComponent({comment}: {comment: Comment}) {
  return (
    <div className={classes.comment}>
      <p className={classes.commentAuthor}>{comment.author.userName}</p>
      <p>{comment.body}</p>
    </div>
  )
}