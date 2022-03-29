import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const UseAuthStatus = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [chekingStatus, setChekingStatus] = useState(true);

	useEffect(() => {
		const auth = getAuth();
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setLoggedIn(true);
			}
			setChekingStatus(false);
		});
		return unsubscribe;
	});

	return { loggedIn, chekingStatus };
};
