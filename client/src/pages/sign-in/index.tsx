// Страница авторизации
import React from 'react'

import AuthController from '../../controllers/auth.controller'
import {SignInProps} from '../../types/auth.types'

import './sign-in.scss'

export default function SignIn({history}: {history: any}) {
    const [form, setForm] = React.useState<SignInProps>({
        login: '',
        password: ''
    })
    const [loading, setLoading] = React.useState<boolean>(true)

    React.useEffect(() => {
        if (form.login && form.password) {
            setLoading(false)
        } else {
            setLoading(true)
        }
    }, [form])

    const inputChangeHandler = (value: string, key: string) => {
        setForm({
            ...form,
            [key]: value
        })
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        AuthController.signIn(form, setLoading)

        history.push('/')
    }

    return (
        <form name='login-form' onSubmit={onSubmit}>
            <label htmlFor='login'>Login <sup style={{color: "red"}}>*</sup></label>
            <input
                id='login'
                className='input-login'
                placeholder='Enter login'
                value={form.login}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputChangeHandler(e.target.value, 'login')}
            />

            <label htmlFor='password'>Password <sup style={{color: "red"}}>*</sup></label>
            <input
                id='password'
                className='input-password'
                placeholder='Enter password'
                type='password'
                value={form.password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputChangeHandler(e.target.value, 'password')}
            />

            <input className='submit-btn' type="submit" value="Sign In" disabled={loading} />
        </form>
    )
}