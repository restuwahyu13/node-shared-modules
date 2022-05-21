import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

export const httpClientPost = async (url: string, data?: Record<string, any>, config?: AxiosRequestConfig): Promise<any> => {
	try {
		const res: AxiosResponse = await axios.post(url, data || {}, config || {})
		return res.data
	} catch (e: any) {
		return Promise.reject(e)
	}
}

export const httpClientGet = async (url: string, config?: AxiosRequestConfig): Promise<any> => {
	try {
		const res: AxiosResponse = await axios.get(url, config || {})
		return res.data
	} catch (e: any) {
		return Promise.reject(e)
	}
}

export const httpClientDelete = async (url: string, config?: AxiosRequestConfig): Promise<any> => {
	try {
		const res: AxiosResponse = await axios.delete(url, config || {})
		return res.data
	} catch (e: any) {
		return Promise.reject(e)
	}
}

export const httpClientPut = async (url: string, data?: Record<string, any>, config?: AxiosRequestConfig): Promise<any> => {
	try {
		const res: AxiosResponse = await axios.put(url, data || {}, config || {})
		return res.data
	} catch (e: any) {
		return Promise.reject(e)
	}
}
