import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowRight } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
import { toast } from 'react-toastify';

import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
} from 'firebase/auth';
import { db } from '../firebase.config';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

const Signup = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [signupData, setSignupData] = useState({
		name: '',
		email: '',
		password: '',
	});

	const { name, email, password } = signupData;

	const navigate = useNavigate();

	const onChange = (e) => {
		setSignupData({
			...signupData,
			[e.target.id]: e.target.value,
		});
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			const auth = getAuth();
			const userCredentials = await createUserWithEmailAndPassword(
				auth,
				email,
				password,
			);
			const user = userCredentials.user;

			updateProfile(auth.currentUser, { displayName: name });

			const signupDataCopy = { ...signupData };

			delete signupDataCopy.password;

			signupDataCopy.timestamp = serverTimestamp();

			// Add a new document in collection "users"
			await setDoc(doc(db, 'users', user.uid), signupDataCopy);

			navigate('/');
		} catch (error) {
			toast.error('Something Went Wrong With Registration');
		}
	};

	return (
		<>
			<div className="pageContainer">
				<header>
					<p className="pageHeader">Welcome Back!</p>
				</header>
				<main>
					<form onSubmit={onSubmit}>
						<input
							type="text"
							placeholder="Name"
							className="nameInput"
							id="name"
							value={name}
							onChange={onChange}
						/>
						<input
							type="email"
							placeholder="Email"
							className="emailInput"
							id="email"
							value={email}
							onChange={onChange}
						/>
						<div className="passwordInputDiv">
							<input
								type={showPassword ? 'text' : 'password'}
								placeholder="Password"
								className="passwordInput"
								id="password"
								value={password}
								onChange={onChange}
							/>
							<img
								src={visibilityIcon}
								alt="show Password"
								className="showPassword"
								onClick={() => setShowPassword((prev) => !prev)}
							/>
						</div>
						<Link to="/forgotpassword" className="forgotPasswordLink">
							Forgot Password
						</Link>

						<div className="signUpBar">
							<p className="signUpText">Sign Up</p>
							<button className="signUpButton" type="submit">
								<ArrowRight fill="#ffffff" width="34px" height="34px" />
							</button>
						</div>
					</form>

					{/* google oauth */}
					<Link to="/signin" className="registerLink">
						Sign In Instead
					</Link>
				</main>
			</div>
		</>
	);
};

export default Signup;
