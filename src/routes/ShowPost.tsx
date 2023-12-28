import { ActionFunctionArgs, Form, Link, LoaderFunctionArgs, redirect, useActionData, useLoaderData } from "react-router-dom"
import { ActionData, Post } from "../types"
import classes from './ShowPost.module.css'
import CommentForm from "../components/CommentForm";
import Vote from "../components/Vote";
import CommentComponent from "../components/Comment";
import auth from "../lib/auth";
import EditPost from "../components/EditPost";
import { useState } from "react";

export const loader = async ({ params: { id } }: LoaderFunctionArgs) => {

    const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/posts/' + id, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

  const posts = await response.json();

  return posts;
};

export const action = async ({ params: { id }}: ActionFunctionArgs) => {

  const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/posts/' + id + '/delete', {
      headers: {
          'Authorization': `Bearer ${auth.getJWT()}`
      },
      method: 'DELETE'
  })

  if (!response.ok) {
      const { message } = await response.json()
      return { message }
  }

  return redirect(`/`)

}

export default function ShowPost() {
  const post = useLoaderData() as Post;
  const error = useActionData() as ActionData;
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <>
      <div className={classes.post}>
        <div className={classes.postVoteAndInfoContainer}>
          <div className={classes.postVoteAndInfo}>
            <Vote post={post} />
            <div className={classes.postInfo}>
                { post.link ? (
                <div className={classes.titleAndLink}>
                  <h2>{post.title}</h2>
                  <Link to={post.link}>
                    <p className={classes.postUrl}>({post.link})</p>
                  </Link>
                </div>
                ) : (
                  <h2>{post.title}</h2>
                )}

              <p>by {post.author.userName}</p>
            </div>
          </div>
          {isOpen && <div onClick={() => setIsOpen(false)} className={classes.backgroundClick}></div>}
          {isOpen && <EditPost post={post} setIsOpen={setIsOpen} />}
          <div className={classes.postChanges}>
            <button className={classes.button} onClick={() => setIsOpen(prev => !prev)}>Edit post</button>
            <Form method="delete" action={`/posts/${post._id}/delete`}>
              {error && <p><b>Error:</b> {error.message}</p>}
              <input type="hidden" name="delete-post" id='delete-post' />
              <button className={classes.button} type="submit">Delete post</button>
            </Form>
          </div>
        </div>
          { post.body && (
            <div className={classes.postBody}>
              <p>{post.body}</p>
            </div>
          )}
      </div>
      <CommentForm postId={post._id} />
      { post.comments?.map(comment => <CommentComponent key={comment._id} comment={comment} postId={post._id} />) }    </>
  );
}
