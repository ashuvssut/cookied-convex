import axios, { AxiosResponse } from "axios";
import { ID, Models } from "appwrite";
import { Platform } from "react-native";
import { APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID } from "../utils/appwrite";
import AsyncStorage from "@react-native-async-storage/async-storage";

const generalHeaders = {
	"Content-Type": "application/json",
	"X-Appwrite-Response-Format": "1.0.0",
	"X-Appwrite-Project": APPWRITE_PROJECT_ID,
};
const axiosWithConfig = axios.create({ headers: generalHeaders });

const axiosWithSessionConfig = (cookie: string) => {
	return axios.create({ headers: { ...generalHeaders, cookie } });
};

export const loginWithEmail = async (email: string, password: string) => {
	try {
		const res: AxiosResponse<Models.Session> = await axiosWithConfig.post(
			`${APPWRITE_ENDPOINT}/account/sessions/email`,
			{ email: email, password: password },
		);
		const cookieStr = res.headers["x-fallback-cookies"];
		const cookieObj = JSON.parse(cookieStr);
		const cookieKey = `a_session_${APPWRITE_PROJECT_ID}`;
		const reqHeaderCookieStr = `${cookieKey}=${cookieObj[cookieKey]}`;
		return { sessionData: res.data, cookie: reqHeaderCookieStr };
	} catch (e: any) {
		throw new Error(e);
	}
};

export const getUserDetails = async (cookie: string) => {
	try {
		const res: AxiosResponse<Models.User<Models.Preferences>> =
			await axiosWithSessionConfig(cookie).get(`${APPWRITE_ENDPOINT}/account`);
		return res.data;
	} catch (e: any) {
		throw new Error(e);
	}
};

export const createAccount = async (
	email: string,
	password: string,
	name: string,
): Promise<Models.User<Models.Preferences>> => {
	try {
		const res: AxiosResponse<Models.User<Models.Preferences>> =
			await axiosWithConfig.post(`${APPWRITE_ENDPOINT}/account`, {
				userId: ID.unique(),
				email: email,
				password: password,
				name: name,
			});
		return res.data;
	} catch (e: any) {
		throw new Error(e);
	}
};

export const logout = async (cookie: string, sessionId: string) => {
	try {
		await axiosWithSessionConfig(cookie).delete(
			`${APPWRITE_ENDPOINT}/account/sessions/${sessionId}`,
		);
		return;
	} catch (e: any) {
		throw new Error(e);
	}
};

export const logoutFromAllDevices = async (cookie: string) => {
	try {
		await axiosWithSessionConfig(cookie).delete(
			`${APPWRITE_ENDPOINT}/account/sessions`,
		);
		return;
	} catch (e: any) {
		throw new Error(e);
	}
};

export const createEmailVerification = async (
	cookie: string,
): Promise<Models.Token> => {
	let REDIRECT_URL = "";
	if (__DEV__) {
		// Code to run in development mode
		console.log("Running in development mode");
		REDIRECT_URL =
			Platform.OS === "web" ? "http://localhost:19000/verify" : "cookied://";
	} else {
		REDIRECT_URL = Platform.OS === "web" ? "" : "cookied://";
	}
	try {
		const tokenObj: AxiosResponse<Models.Token> = //
			await axiosWithSessionConfig(cookie) //
				.post(`${APPWRITE_ENDPOINT}/account/verification`, {
					url: REDIRECT_URL,
				});
		return tokenObj.data;
	} catch (e: any) {
		throw new Error(e);
	}
};

export const verifyEmail = async (
	cookie: string,
	userId: string,
	secret: string,
): Promise<Models.Token> => {
	try {
		const tokenObj: AxiosResponse<Models.Token> = await axiosWithSessionConfig(
			cookie,
		).put(`${APPWRITE_ENDPOINT}/account/verification`, {
			userId: userId,
			secret: secret,
		});
		return tokenObj.data;
	} catch (e: any) {
		throw new Error(e);
	}
};

// export const createJwtSession = async () => {
// 	try {
// 		const res: AxiosResponse<Models.Jwt> = await axiosWithConfig.post(
// 			`${APPWRITE_ENDPOINT}/account/jwt`,
// 		);
// 		if (Platform.OS === "web") {
// 			localStorage.setItem("jwt", res.data.jwt);
// 		} else {
// 			await AsyncStorage.setItem("jwt", res.data.jwt);
// 		}
// 		return res.data;
// 	} catch (e) {
// 		throw new Error(e);
// 	}
// };
