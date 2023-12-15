import { ActionFunctionArgs, Form, redirect, useActionData } from 'react-router-dom'
import classes from './SignUp.module.css'

export const action = async (args: ActionFunctionArgs) => {
    const { request } = args

    const formData = await request.formData()

    const username = formData.get('username')
    const password = formData.get('password')
    const passwordConfirmation = formData.get('password_confirmation')

    if (password !== passwordConfirmation) {
        return { message: 'Passwords do not match' }
    }

    const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/register', {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ username, password })
    })

    if (!response.ok) {
        const { message } = await response.json()

        return { message }
    }

    return redirect('/sign-in')

}

export default function Signup() {

    const error = useActionData() as { message: string } | undefined


  return (
    <div className={classes.signupForm}>
        <h2>Create a new account</h2>
        <Form method='post'>
            {error && <p><b>Error:</b>  {error.message}</p>}
            <div className={classes.formGroup}>
                <label htmlFor='username'>Username</label>
                <input type='text' name='username' id='username' required />
            </div>
            <div className={classes.formGroup}>
                <label htmlFor='password'>Password</label>
                <input type='password' name='password' id='password' required />
            </div>
            <div className={classes.formGroup}>
                <label htmlFor='password_confirmation'>Password confirmation</label>
                <input type='password' name='password_confirmation' id='password_confirmation' required />
            </div>
            <div>
                <button type='submit'>Create user</button>
            </div>
        </Form>
    </div>
  )
}
