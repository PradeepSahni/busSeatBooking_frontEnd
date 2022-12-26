import * as Yup from 'yup'

export const signUpSchema = Yup.object({
    name: Yup.string().min(2).max(20).required("Enter your name"),
    email: Yup.string().min(2).email().required("Enter your email"),
    password: Yup.string().min(6).required("Enter your Password"),
    confirmPassword: Yup.string().min(6).required("Enter your Password").oneOf([Yup.ref('password'),null],'password must match')
})

export const signInSchema = Yup.object({
    email: Yup.string().email().required("Enter your email"),
    password: Yup.string().min(6).required("Enter your Password")
})