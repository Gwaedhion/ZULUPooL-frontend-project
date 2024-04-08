'use client';
import { FormEvent, useState } from 'react';
import styles from './page.module.css';
import cn from 'classnames';
import Link from 'next/link';
import axios from 'axios';
import { API } from '@/app/api';
import { IuserApiCredentials } from './auth.interface';
import { useRouter } from 'next/navigation';

export default function Login() {
	const router = useRouter();
	const [backgroundState, setBackgroundState] = useState('blue');
	const [userLoginValues, setUserLoginValues] = useState<IuserApiCredentials>(
		{
			login: '',
			password: '',
			totp: '',
		}
	);
	const [userRegisterValues, setUserRegisterValues] = useState({});

	const dataToPost = {
		login: userLoginValues.login,
		password: userLoginValues.password,
		totp: userLoginValues.totp,
	};

	const dataToJSON = JSON.stringify(dataToPost);

	const tryToLogin = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			await axios.post(API.user.userLogin, dataToJSON).then((res) => {
				sessionStorage.setItem('sessionID', res.data.sessionid);
				sessionStorage.setItem('isReadOnly', res.data.isReadOnly);
				router.push('/');
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div
			className={cn(styles.pageWrapper, {
				[styles.pageWrapper_blue]: backgroundState === 'blue',
				[styles.pageWrapper_purple]: backgroundState === 'purple',
			})}
		>
			<div
				className={cn(styles.decoration, {
					[styles.decoration_blue]: backgroundState === 'blue',
					[styles.decoration_purple]: backgroundState === 'purple',
				})}
			></div>
			<div
				className={cn(styles.container, {
					[styles.container_blue]: backgroundState === 'blue',
					[styles.container_purple]: backgroundState === 'purple',
				})}
			>
				<div className={cn(styles.box, styles.signIn)}>
					<h2 className={styles.h2}>Already have an account?</h2>
					<button
						className={styles.signInBtn}
						onClick={() => {
							setBackgroundState('blue');
						}}
					>
						Sign In
					</button>
				</div>
				<div className={cn(styles.box, styles.signUp)}>
					<h2 className={styles.h2}>Don&apos;t have an account?</h2>
					<button
						className={styles.signUpBtn}
						onClick={() => {
							setBackgroundState('purple');
						}}
					>
						Sign Up
					</button>
				</div>
				<div
					className={cn(styles.formBox, {
						[styles.formBox_blue]: backgroundState === 'blue',
						[styles.formBox_purple]: backgroundState === 'purple',
					})}
				>
					{backgroundState == 'blue' && (
						<form
							className={styles.signInForm}
							onSubmit={(e) => {
								tryToLogin(e);
							}}
						>
							<h3 className={styles.signInTitle}>Sign In</h3>
							<label
								className={styles.signInLabel}
								htmlFor="login"
							>
								Login
							</label>
							<input
								className={styles.signInInput}
								type="text"
								placeholder="Username"
								name="login"
								id="login"
								required
								onChange={(event) => {
									setUserLoginValues({
										...userLoginValues,
										login: event.target.value,
									});
									console.log(userLoginValues);
								}}
							/>
							<label
								className={styles.signInLabel}
								htmlFor="password"
							>
								Password
							</label>
							<input
								className={styles.signInInput}
								type="password"
								placeholder="Password"
								name="password"
								autoComplete="on"
								id="password"
								required
								onChange={(event) => {
									setUserLoginValues({
										...userLoginValues,
										password: event.target.value,
									});
								}}
							/>
							<label
								className={styles.signInLabel}
								htmlFor="totp"
							>
								2fa code
							</label>
							<input
								className={styles.signInInput}
								type="text"
								placeholder="OTP (option)"
								name="totp"
								id="totp"
								onChange={(event) => {
									setUserLoginValues({
										...userLoginValues,
										totp: event.target.value,
									});
								}}
							/>

							<button
								className={styles.signInButton}
								type="submit"
							>
								LOGIN
							</button>
							<Link
								className={styles.signInLink}
								href={'/change-password'}
							>
								Forgot password?
							</Link>
						</form>
					)}
					{backgroundState == 'purple' && (
						<form className={styles.signUpForm}>
							<h3 className={styles.signUpTitle}>Sign Up</h3>
							<label
								className={styles.signUpLabel}
								htmlFor="login"
							>
								Login
							</label>
							<input
								className={styles.signUpInput}
								type="text"
								placeholder="Username"
								name="login"
								id="login"
								onChange={(event) => {
									setUserRegisterValues({
										...userRegisterValues,
										login: event.target.value,
									});
								}}
							/>
							<label
								className={styles.signUpLabel}
								htmlFor="publicname"
							>
								Public name
							</label>
							<input
								className={styles.signUpInput}
								type="email"
								placeholder="Public name"
								name="publicname"
								id="publicname"
								onChange={(event) => {
									setUserRegisterValues({
										...userRegisterValues,
										publicname: event.target.value,
									});
								}}
							/>
							<label
								className={styles.signUpLabel}
								htmlFor="password"
							>
								Password
							</label>
							<input
								className={styles.signUpInput}
								type="password"
								placeholder="Password"
								name="password"
								autoComplete="on"
								id="password"
								onChange={(event) => {
									setUserRegisterValues({
										...userRegisterValues,
										password: event.target.value,
									});
								}}
							/>
							<label
								className={styles.signUpLabel}
								htmlFor="email"
							>
								E-mail
							</label>
							<input
								className={styles.signUpInput}
								type="email"
								placeholder="E-mail"
								name="email"
								autoComplete="on"
								id="email"
								onChange={(event) => {
									setUserRegisterValues({
										...userRegisterValues,
										email: event.target.value,
									});
								}}
							/>

							<input
								className={styles.signUpButton}
								type="submit"
								value="Create user (still beta)"
							/>
						</form>
					)}
				</div>
			</div>
		</div>
	);
}
