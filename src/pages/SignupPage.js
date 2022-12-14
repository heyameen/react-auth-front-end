import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import { useToken } from '../auth/useToken'

export const SignupPage = () => {
    const [token, setToken] = useToken()
    const [errorMessage, setErrorMessage] = useState('')
    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [confirmPasswordValue, setConfirmPasswordValue] = useState('')

    const history = useHistory()
    
    const onSignupClicked = async () => {
        const response = await axios.post('api/signup', {
            email: emailValue,
            password: passwordValue
        })

        const { token } = response.data
        setToken(token)
        history.push('/')
    }

    return (
        <div className="content-container">
            <h1>Sign up</h1>
            {errorMessage && <div className="fail">{errorMessage}</div>}
            <input value={emailValue} onChange={e => setEmailValue(e.target.value)} type="text" placeholder="someone@gmail.com" />
            <input value={passwordValue} onChange={e => setPasswordValue(e.target.value)} type="password" placeholder="password" />
            <input value={confirmPasswordValue} onChange={e => setConfirmPasswordValue(e.target.value)} type="password" placeholder="password" />
            <hr/>
            <button disabled={!emailValue || !passwordValue || passwordValue !== confirmPasswordValue} onClick={onSignupClicked}>Sign up</button>
            <button onClick={() => history.push('/login')}>Already have an account? Login</button>
        </div>
    )
}