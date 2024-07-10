import { useFormik } from "formik"
import classNames from "classnames"
import * as yup from "yup"
import React, { useEffect, useMemo, useState } from 'react'
import { useLoginMutation } from "../../redux/api's/authApi"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const Login = ({ show }) => {
    const [login] = useLoginMutation()
    const formik = useFormik({
        initialValues: {},
        validationSchema: yup.object({
            email: yup.string().email("Please Enter Valid Email").required("Enter Email"),
            password: yup.string().required("Enter Password"),
        }),
        onSubmit: (values, { resetForm }) => {
            login(values)
            resetForm()
        }
    })

    const emailClasses = useMemo(() => classNames({
        "form-control": true,
        "is-valid": formik.touched.email && !formik.errors.email,
        "is-invalid": formik.touched.email && formik.errors.email,
    }), [formik])
    const passwordClasses = useMemo(() => classNames({
        "form-control": true,
        "is-valid": formik.touched.password && !formik.errors.password,
        "is-invalid": formik.touched.password && formik.errors.password,
    }), [formik])

    const navigate = useNavigate()
    const { user } = useSelector(state => state.auth)
    useEffect(() => {
        if (user) {
            if (user.role === "admin") { navigate("/admin") }
            if (user.role === "user") { navigate("/user") }
        }
    }, [user])

    return <>
        <div className="container ">
            <div className="row">
                <div className="col-sm-6 offset-sm-3">
                    <div className="card animate__animated animate__headShake">
                        <div className="card-header  text-center">Login User Or Admin</div>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="card-body">
                                <div>
                                    <label htmlFor="email" className="form-label">First Email</label>
                                    <input
                                        className={emailClasses}
                                        {...formik.getFieldProps("email")}
                                        type="text"

                                        id="email"
                                        placeholder="Enter Your Email"
                                    />
                                    <div className="valid-feedback">Looks good!</div>
                                    <div className="invalid-feedback">{formik.errors.email}</div>
                                </div>
                                <div className="mt-2">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        {...formik.getFieldProps("password")}
                                        type="password"
                                        className={passwordClasses}
                                        id="password"
                                        placeholder="Enter Your Password"
                                    />
                                    <div className="valid-feedback">Looks good!</div>
                                    <div className="invalid-feedback">{formik.errors.password}</div>
                                </div>
                                <button type="submit" className="btn btn-primary w-100 mt-3">
                                    Login
                                </button>
                                <p className="text-center mt-3">
                                    Dont Have Account? <button className='btn btn-link' onClick={e => show()} href="#">Create Account</button>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Login