import "./SignUpFormModal.css"
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { useModal } from "../../context/Modal";
import { useEffect } from "react";

function SignupFormPage() {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [submittedWithErrors, setSubmittedWithErrors] = useState(false)
    const [dbErrors, setDbErrors] = useState({});


    useEffect(() => {
        const errorsObj = {};
        if (!username) errorsObj.username = "Username is required";
        if (username && username.length < 4) errorsObj.username = "Username must be at least 4 characters"
        if (!email) errorsObj.email = "Email is required";
        if (email && (!email.includes('@') || !email.includes('.'))) errorsObj.email = "Must be a valid email";
        if (!firstName) errorsObj.firstName = "First name is required";
        if (firstName && (firstName.length < 3 || firstName.length > 26)) errorsObj.firstName = "First name must be between 3 and 26 characters";
        if (!lastName) errorsObj.lastName = "Last name is required";
        if (lastName && (lastName.length < 3 || firstName.length > 26)) errorsObj.lastName = "Last name must be between 3 and 26 characters";
        if (!password) errorsObj.password = "Password is required";
        if (password && password.length < 6) errorsObj.password = "Password must be 6 characters or more"
        if (password && password !== confirmPassword) errorsObj.confirmPassword = "Passwords do not match";
        setErrors(errorsObj);
    }, [email, username, firstName, lastName, password, confirmPassword]);

    useEffect(() => {

    }, [dbErrors])


    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Object.values(errors).length) {
            setSubmittedWithErrors(true);
            return
        }

        const newUser = await dispatch(sessionActions.signup({
            email,
            username,
            firstName,
            lastName,
            password,
        })).catch(async (errors) => {
            const res = await errors.json();
            console.log(res);
            if (res.errors.email) setDbErrors({ email: 'Email is already being used' });
            if (res.errors.username) setDbErrors({ username: 'Username is already being used' });
            return
        })

        if (newUser) closeModal()


        // e.preventDefault();
        // if (password === confirmPassword) {
        //     setErrors({});
        //     return dispatch(
        //         sessionActions.signup({
        //             email,
        //             username,
        //             firstName,
        //             lastName,
        //             password,
        //         })

        //     ).catch(async (res) => {
        //         const data = await res.json();
        //         if (data && data.errors) {
        //             console.log(data.errors)
        //             setErrors(data.errors);
        //             console.log(errors)
        //         }
        //     })
        //         .then(() => {
        //             console.log("NEW ERRORS !!!!!!!!!", errors);
        //             if (Object.values(errors)) {
        //                 setUniquenessErrors(true);
        //                 setSubmittedWithErrors(true);
        //                 return
        //             }
        //             closeModal();
        //         })
        // }
        // return setErrors({
        //     confirmPassword: "Confirm Password field must be the same as the Password field"
        // });


    }

    console.log("ERRORS PAGE : ", errors)

    return (
        <div id="signup-page-container">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Email
                </label>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                {submittedWithErrors && errors.email && <p className="errors">{errors.email}</p>}
                {dbErrors && dbErrors.email && <p className="errors">{dbErrors.email}</p>}
                <label>
                    Username
                </label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                {submittedWithErrors && errors.username && <p className="errors">{errors.username}</p>}
                {dbErrors && dbErrors.username && <p className="errors">{dbErrors.username}</p>}
                <label>
                    First Name
                </label>
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                {submittedWithErrors && errors.firstName && <p className="errors">{errors.firstName}</p>}
                <label>
                    Last Name
                </label>
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                {submittedWithErrors && errors.lastName && <p className="errors">{errors.lastName}</p>}
                <label>
                    Password
                </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {submittedWithErrors && errors.password && <p className="errors">{errors.password}</p>}
                <label>
                    Confirm Password
                </label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                {submittedWithErrors && errors.confirmPassword && <p className="errors">{errors.confirmPassword}</p>}
                <button
                    id="sign-up-submit-button"
                    type="submit"
                >Sign Up</button>
            </form>
        </div>
    );
}

export default SignupFormPage;
