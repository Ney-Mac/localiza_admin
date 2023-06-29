import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { BASE_URL } from 'src/config';

const HANDLERS = {
	INITIALIZE: 'INITIALIZE',
	SIGN_IN: 'SIGN_IN',
	SIGN_OUT: 'SIGN_OUT'
};

const initialState = {
	isAuthenticated: false,
	isLoading: true,
	user: null
};

const handlers = {
	[HANDLERS.INITIALIZE]: (state, action) => {
		const user = action.payload;

		return {
			...state,
			...(
				// if payload (user) is provided, then is authenticated
				user
					? ({
						isAuthenticated: true,
						isLoading: false,
						user
					})
					: ({
						isLoading: false
					})
			)
		};
	},
	[HANDLERS.SIGN_IN]: (state, action) => {
		const user = action.payload;

		return {
			...state,
			isAuthenticated: true,
			user
		};
	},
	[HANDLERS.SIGN_OUT]: (state) => {
		return {
			...state,
			isAuthenticated: false,
			user: null
		};
	}
};

const reducer = (state, action) => (
	handlers[action.type] ? handlers[action.type](state, action) : state
);

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
	const { children } = props;
	const [state, dispatch] = useReducer(reducer, initialState);
	const initialized = useRef(false);

	const initialize = async () => {
		// Prevent from calling twice in development mode with React.StrictMode enabled
		if (initialized.current) {
			return;
		}

		initialized.current = true;

		let user = null;

		try {
			user = window.localStorage.getItem('userInfo');
		} catch (err) {
			console.error(err);
		}

		if (user) {
			user = JSON.parse(user); 

			dispatch({
				type: HANDLERS.INITIALIZE,
				payload: user
			});
		} else {
			dispatch({
				type: HANDLERS.INITIALIZE
			});
		}
	};

	useEffect(
		() => {
			initialize();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	const signIn = async (email, password) => {
		const res = await axios({
			method: 'post',
			url: `${BASE_URL}user/login`,
			data: {
				login: email,
				password,
			}
		});
		const user = await res.data.data;

		if(user.user.roles[0].name !== 'admin') {
			throw new Error('Sua conta não é de um administrador. Use o aplicativo para telefone.');
		}

		try {
			window.sessionStorage.setItem('authenticated', 'true');
			window.localStorage.setItem('userInfo', JSON.stringify(res.data.data));
		} catch (err) {
			console.error(err);
		}

		dispatch({
			type: HANDLERS.SIGN_IN,
			payload: user
		});
	};

	const signOut = () => {
		window.localStorage.removeItem('userInfo');

		dispatch({
			type: HANDLERS.SIGN_OUT
		});
	};

	return (
		<AuthContext.Provider
			value={{
				...state,
				signIn,
				signOut
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

AuthProvider.propTypes = {
	children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
