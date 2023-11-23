import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import { useModal } from "../../context/Modal";
import InputField from "../FormComponents/InputField";
import Title from "../FormComponents/Title";
import SubmitButton from "../FormComponents/SubmitButton";

const SignUpFormPage = () => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [submittedWithErrors, setSubmittedWithErrors] = useState(false);
  const [dbErrors, setDbErrors] = useState({});

  useEffect(() => {
    const validateForm = () => {
      const errorsObj = {};
      const {
        username,
        email,
        firstName,
        lastName,
        password,
        confirmPassword,
      } = formData;

      if (!username) errorsObj.username = "Username is required";
      if (username && username.length < 4)
        errorsObj.username = "Username must be at least 4 characters";
      if (!email) errorsObj.email = "Email is required";
      if (email && (!email.includes("@") || !email.includes(".")))
        errorsObj.email = "Must be a valid email";
      if (!firstName) errorsObj.firstName = "First name is required";
      if (firstName && (firstName.length < 3 || firstName.length > 26))
        errorsObj.firstName = "First name must be between 3 and 26 characters";
      if (!lastName) errorsObj.lastName = "Last name is required";
      if (lastName && (lastName.length < 3 || lastName.length > 26))
        errorsObj.lastName = "Last name must be between 3 and 26 characters";
      if (!password) errorsObj.password = "Password is required";
      if (password && password.length < 6)
        errorsObj.password = "Password must be 6 characters or more";
      if (password && password !== confirmPassword)
        errorsObj.confirmPassword = "Passwords do not match";

      setErrors(errorsObj);
    };

    validateForm();
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(errors).length) {
      setSubmittedWithErrors(true);
      return;
    }

    const newUser = await dispatch(sessionActions.signup(formData)).catch(
      async (errors) => {
        const res = await errors.json();
        // console.log(res);
        if (res.errors.email)
          setDbErrors({ email: "Email is already being used" });
        if (res.errors.username)
          setDbErrors({ username: "Username is already being used" });
        return;
      }
    );

    if (newUser) closeModal();
  };

  return (
    <div className="flex flex-col gap-3">
      <Title title="Sign Up" />
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {Object.keys(formData).map((key) => (
          <InputField
            key={key}
            label={key.charAt(0).toUpperCase() + key.slice(1)}
            type={key.includes("password") ? "password" : "text"}
            value={formData[key]}
            onChange={(e) =>
              setFormData({ ...formData, [key]: e.target.value })
            }
            required
            error={
              (submittedWithErrors && errors[key]) ||
              (dbErrors && dbErrors[key])
            }
          />
        ))}
        <SubmitButton buttonText={'Sign Up'} type={'submit'}/>
      </form>
    </div>
  );
};

export default SignUpFormPage;
