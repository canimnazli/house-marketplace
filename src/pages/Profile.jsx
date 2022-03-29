import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, updateProfile } from 'firebase/auth';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';

const Profile = () => {
	const auth = getAuth();
	const [changeUserData, setChangeUserData] = useState(false);
	const [userData, setUserData] = useState({
		name: auth.currentUser.displayName,
		email: auth.currentUser.email,
	});

	const { name, email } = userData;

	const navigate = useNavigate();

	const onLogout = () => {
		auth.signOut();
		navigate('/');
	};

	const onSubmit = async () => {
		try {
			if (auth.currentUser.displayName !== name) {
				//update display name in firebase
				await updateProfile(auth.currentUser, {
					displayName: name,
				});

				//update in firestore
				const userRef = doc(db, 'users', auth.currentUser.uid);
				await updateDoc(userRef, { name: name });
			}
		} catch (error) {
			toast.error('Could Not Update Profile');
		}
	};

	const onChange = (e) => {
		setUserData({
			...userData,
			[e.target.id]: e.target.value,
		});
	};

	return (
		<div className="profile">
			<header className="profileHeader">
				<p className="pageHeader">My Profile</p>
				<button type="button" className="logOut" onClick={onLogout}>
					Logout
				</button>
			</header>

			<main>
				<div className="profileDetailsHeader">
					<p className="profileDetailsText">Personal Details</p>
					<p
						className="changePersonalDetails"
						onClick={() => {
							changeUserData && onSubmit();
							setChangeUserData(!changeUserData);
						}}
					>
						{changeUserData ? 'done' : 'change'}
					</p>
				</div>

				<div className="profileCard">
					<form>
						<input
							type="text"
							id="name"
							className={changeUserData ? 'profileName' : 'profileNameActive'}
							disabled={!changeUserData}
							value={name}
							onChange={onChange}
						/>
						<input
							type="text"
							id="email"
							className={changeUserData ? 'profileEmail' : 'profileEmailActive'}
							disabled={!changeUserData}
							value={email}
							onChange={onChange}
						/>
					</form>
				</div>
			</main>
		</div>
	);
};

export default Profile;
