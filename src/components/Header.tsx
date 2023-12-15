import classes from './Header.module.css'
import { Link, useFetcher } from 'react-router-dom'
import auth from '../lib/auth'

export default function Header() {

  const isAuthenticated = auth.isSignedIn()
  const fetcher = useFetcher()

  return (
    <div className={classes.header}>
        <h1>Reddit</h1>
        <div className={classes.headerActions}>
          {isAuthenticated ? 
          <>
            <Link to='create-post'>
              <button>New post</button>
            </Link>
            <fetcher.Form method='post' action='/sign-out'>
              <button type='submit'>Sign out</button>
            </fetcher.Form>

          </>
          :  
            <>
            <Link to='/sign-in'>
                <button>Sign in</button>
            </Link>
            <Link to='/sign-up'>
                <button>Sign up</button>
            </Link>
            </>
          }
        </div>
    </div>
  )
}
