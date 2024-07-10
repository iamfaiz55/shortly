import { useFormik } from "formik"
import classNames from "classnames"
import * as yup from "yup"
import React, { useEffect, useMemo } from 'react'
import { useRegisterMutation } from "../../redux/api's/authApi"
import { useNavigate } from "react-router-dom"

const Register = ({ show }) => {
    const naviate = useNavigate()
    const [registerUser, { isSuccess }] = useRegisterMutation()
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            cpassword: "",
            role: ""
        },
        validationSchema: yup.object({
            name: yup.string().required("Enter Name"),
            email: yup.string().email("Please Enter Valid Email").required("Enter Email"),
            password: yup.string().required("Enter Password"),
            cpassword: yup.string().oneOf([yup.ref("password")]),
            role: yup.string().required("Enter Role"),
        }),

        onSubmit: (values, { resetForm }) => {
            registerUser(formik.values)
            resetForm()
        }
    })
    const getClasses = (fieldName) => {
        return classNames({
            "form-control": true,
            "is-valid": formik.touched[fieldName] && !formik.errors[fieldName],
            "is-invalid": formik.touched[fieldName] && formik.errors[fieldName],
        })
    }

    useEffect(() => {
        if (isSuccess) {
            show()
        }
    }, [isSuccess])


    return <>
        < div className="container" >
            <div className="row">
                <div className="col-sm-6 offset-sm-3">
                    <div className="card animate__animated animate__headShake">
                        <div className="card-header">Signup</div>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="card-body">
                                <div>
                                    <label htmlFor="name" className="form-label">First name</label>
                                    <input
                                        {...formik.getFieldProps("name")}
                                        className={getClasses("name")}
                                        type="text"

                                        id="name"
                                        placeholder="Enter your name"
                                    />
                                    <div className="valid-feedback">Looks good!</div>
                                    <div className="invalid-feedback">Please choose a username.</div>
                                </div>
                                <div className="mt-2">
                                    <label htmlFor="email" className="form-label">First Email</label>
                                    <input
                                        {...formik.getFieldProps("email")}
                                        className={getClasses("email")}
                                        type="text"

                                        id="email"
                                        placeholder="Enter Your Email"
                                    />
                                    <div className="valid-feedback">Looks good!</div>
                                    <div className="invalid-feedback">Please choose a username.</div>
                                </div>
                                <div className="mt-2">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        {...formik.getFieldProps("password")}
                                        className={getClasses("password")}
                                        type="text"
                                        id="password"
                                        placeholder="Enter Your Password"
                                    />
                                    <div className="valid-feedback">Looks good!</div>
                                    <div className="invalid-feedback">Please choose a password.</div>
                                </div>
                                <div className="mt-2">
                                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                                    <input
                                        {...formik.getFieldProps("cpassword")}
                                        className={getClasses("cpassword")}
                                        type="text"

                                        id="cpassword"
                                        placeholder="Confirm Your Password"
                                    />
                                    <div className="valid-feedback">Looks good!</div>
                                    <div className="invalid-feedback">
                                        Please Recheck Your Password.
                                    </div>
                                </div>


                                <div className="mt-2">
                                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                                    <select  {...formik.getFieldProps("role")} className="form-select">
                                        <option selected>Select Role</option>
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>

                                    </select>
                                    <div className="valid-feedback">Looks good!</div>
                                    <div className="invalid-feedback">
                                        Please Recheck Your Password.
                                    </div>
                                </div>
                                <button onClick={e => registerUser(formik.values)} type="submit" className="btn btn-primary w-100 mt-3">
                                    Signup
                                </button>
                                <p className="text-center mt-3">
                                    Already Have Account? <button className='btn btn-link' onClick={e => show()} href="#">Login</button>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </ div>
    </>
}

export default Register