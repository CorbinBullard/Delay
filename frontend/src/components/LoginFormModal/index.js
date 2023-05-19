import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginFormModal.css";

function LoginFormModal() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        return dispatch(sessionActions.login({ credential, password }))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                }
            });
    };
    const loginDemoUser = (e) => {
        e.preventDefault();
        return dispatch(sessionActions.login({ credential: 'DemoUser', password: 'password' }))
            .then(closeModal)
    }

    return (
        <div id="login-page-container">
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Username or Email
                </label>
                <input
                    type="text"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    required
                />
                <label>
                    Password
                </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {errors.credential && (
                    <p>{errors.credential}</p>
                )}
                <button
                    id="login-submit-button"
                    type="submit">Log In</button>
            </form>
            <button
                onClick={loginDemoUser}
                id="login-demo-user-button">
                Login as Demo User
            </button>
        </div>
    );
}

export default LoginFormModal;
