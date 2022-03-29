import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowRight } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';

const Signin = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [signinData, setSigninData] = useState({ email: '', password: '' });

	const { email, password } = signinData;

	const navigate = useNavigate();

	const onChange = (e) => {
		setSigninData((prev) => ({
			...prev,
			[e.target.id]: e.target.value,
		}));
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			const auth = getAuth();
			const userCredentials = await signInWithEmailAndPassword(
				auth,
				email,
				password,
			);
			const user = userCredentials.user;
			if (user) {
				navigate('/');
			}
		} catch (error) {
			toast.error('Bad User Credentials');
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

						<div className="signInBar">
							<p className="signInText">Sign In</p>
							<button className="signInButton">
								<ArrowRight fill="#ffffff" width="34px" height="34px" />
							</button>
						</div>
					</form>

					{/* google oauth */}
					<Link to="/signup" className="registerLink">
						Sign Up Instead
					</Link>
				</main>
			</div>
		</>
	);
};

export default Signin;
