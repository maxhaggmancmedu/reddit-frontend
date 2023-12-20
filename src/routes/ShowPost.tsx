import { Link, LoaderFunctionArgs, useLoaderData } from "react-router-dom"
import { Post } from "../types"
import classes from './ShowPost.module.css'
import CommentForm from "../components/CommentForm";
import Vote from "../components/Vote";
import CommentComponent from "../components/Comment";

export const loader = async ({ params: { id } }: LoaderFunctionArgs) => {
    // const { params: { id } } = args
    // const { id } = params
     const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/posts/' + id, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const posts = await response.json();

  return posts;
};

export default function ShowPost() {
  const post = useLoaderData() as Post;
  // const commentsFetcher = useFetcher({ key: 'comment-form-' + post._id})
  
  return (
    <>
      <div className={classes.post}>
        <div className={classes.postVoteAndInfo}>
          <Vote post={post} />
          <div className={classes.postInfo}>
            { post.link ? (
              <Link to={post.link}>
                <h2>{post.title}<span className={classes.postUrl}>({post.link})</span></h2>
              </Link>
            ) : (
              <h2>{post.title}</h2>
            )}
            <p>by {post.author.userName}</p>
          </div>

        </div>
          { post.body && (
            <div className={classes.postBody}>
              <p>{post.body}</p>
            </div>
          )}
      </div>
      <CommentForm postId={post._id} />
      { post.comments?.map(comment => <CommentComponent key={comment._id} comment={comment} />) }    </>
  );
}
