// Страница регистрации
import React from 'react'

import AuthController from '../../controllers/auth.controller'
import {SignUpProps} from '../../types/auth.types'

import './sign-up.scss'

export default function SignUp({history}: {history: any}) {
    const [form, setForm] = React.useState<SignUpProps>({
        email: '',
        password: '',
        name: ''
    })
    const [loading, setLoading] = React.useState<boolean>(false)

    React.useEffect(() => {
        if (form.email && form.password && form.name) {
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

        AuthController.signUp(form, setLoading)

        history.push('/')
    }

    return (
        <form name='reg-form' onSubmit={onSubmit}>
            <label htmlFor='name'>User name <sup style={{color: "red"}}>*</sup></label>
            <input
                id='name'
                className='input-name'
                placeholder='Enter name'
                value={form.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputChangeHandler(e.target.value, 'name')}
            />

            <label htmlFor='login'>Email <sup style={{color: "red"}}>*</sup></label>
            <input
                id='email'
                className='input-email'
                placeholder='Enter email'
                type='email'
                value={form.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputChangeHandler(e.target.value, 'email')}
            />

            <label htmlFor='login'>Password <sup style={{color: "red"}}>*</sup></label>
            <input
                id='password'
                className='input-password'
                placeholder='Enter password'
                type='password'
                value={form.password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputChangeHandler(e.target.value, 'password')}
            />

            <input className='submit-btn' type="submit" value="Sign Up" disabled={loading} />
        </form>
    )
}