import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom'
import Index, {loader as indexLoader} from './routes/Index.tsx'
import Signup, { action as signUpAction } from './routes/SignUp.tsx'
import Signin, { action as signInAction } from './routes/SignIn.tsx'
import CreatePost, { action as createPostAction } from './routes/CreatePost.tsx'
import auth from './lib/auth.ts'
import RequireAuth from './components/RequireAuth.tsx'
import ShowPost, { loader as showPostLoader, action as deletePostAction} from './routes/ShowPost.tsx'
import { action as createCommentAction } from './components/CommentForm.tsx'
import { action as voteAction } from './components/Vote.tsx'
import { action as deleteCommentAction } from './components/Comment.tsx'
import { action as editPostAction } from './components/EditPost.tsx'
import { action as editCommentAction } from './components/EditComment.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        loader: indexLoader,
        element: <Index />
      },
      {
        path: '/posts/:id',
        loader: showPostLoader,
        element: <ShowPost />
      },
      {
        path: 'sign-in',
        action: signInAction,
        element: <Signin />
      },
      {
        path: 'sign-up',
        action: signUpAction,
        element: <Signup />
      },
      {
        path: 'sign-out',
        action: () => {
          auth.signOut()
          return redirect('/')
        }
      },
      {
        element: <RequireAuth />,
        children: [
          {
            path: 'create-post',
            action: createPostAction,
            element: <CreatePost />
          },
          {
            path: '/posts/:postId/comments',
            action: createCommentAction,
          },
          {
            path: '/posts/:postId/vote',
            action: voteAction
          },
          {
            path: '/posts/:postId/comments/:commentId',
            action: deleteCommentAction,
          },
          {
            path: '/posts/:id/delete',
            action: deletePostAction,
          },
          {
            path: '/posts/:id/edit',
            action: editPostAction
          },
          {
            path: '/posts/:postId/comments/:commentId/edit',
            action: editCommentAction,
          }
        ]
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
