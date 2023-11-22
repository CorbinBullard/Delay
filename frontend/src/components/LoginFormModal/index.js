import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginFormModal.css";
import Title from "../FormComponents/Title";
import SubmitButton from "../FormComponents/SubmitButton";
import InputField from "../FormComponents/InputField";

function LoginFormModal() {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    credential: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ ...formData }))
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
    return dispatch(
      sessionActions.login({ credential: "DemoUser", password: "password" })
    ).then(closeModal);
  };

  return (
    <div className="flex flex-col gap-3">
      <Title title="Log In" />
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {Object.keys(formData).map((key) => (
          <InputField
            key={key}
            label={key === "credential" ? 'Username or Email': key.charAt(0).toUpperCase() + key.slice(1)}
            type={key.includes("password") ? "password" : "text"}
            value={formData[key]}
            onChange={(e) =>
              setFormData({ ...formData, [key]: e.target.value })
            }
            required
          />
        ))}

        <SubmitButton buttonText={"Sign In"} type={"submit"} />
      </form>
      <button onClick={loginDemoUser} className="font-semibold hover:text-sky-900">
        Login as Demo User
      </button>
    </div>
  );
}

export default LoginFormModal;
