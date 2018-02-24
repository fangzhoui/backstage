import axios from './index'
import md from 'js/md5'


const sign_key = 'YpXmmnW7JAgdZVwFgI2vUfcn71CsAfYY'


export default {
	post(path, params={}){
		let token = sessionStorage.getItem('bybToken')
		let tem = (new Date()).valueOf();
		let target = {}
		if(!!token){
			target = {
				token: token,
				timestamp: tem,
				protocol_version: '101'
			}
		}else{
			target = {
				timestamp: tem,
				protocol_version: '101'
			}
		}
		Object.assign(params, target)
		let form = new FormData()
		let arr = []
		let str = ''
		for(let a of Object.keys(params)){
			arr.push(a)
		}
		let arrSort = arr.sort()
		for(let b of arrSort){
			let val = params[b]
			str += `${b}=${val}&`
			form.append(b, val)
		}
		let newStr = `${str}${sign_key}`
		newStr = encodeURIComponent(newStr).toLocaleUpperCase()
		let sign = md.hex_md5(newStr)
		return axios.post(`${path}?sign=${sign}`, form)
	},
	get(path, params={}){
		let token = sessionStorage.getItem('bybToken')
		let tem = (new Date()).valueOf();
		let target = {}
		if(!!token){
			target = {
				token: token,
				timestamp: tem,
				protocol_version: '101'
			}
		}else{
			target = {
				timestamp: tem,
				protocol_version: '101'
			}
		}
		Object.assign(params, target)
		let arr = []
		let str = ''
		for(let a of Object.keys(params)){
			arr.push(a)
		}
		let arrSort = arr.sort()
		for(let b of arrSort){
			let val = params[b]
			str += `${b}=${val}&`
		}
		let newStr = `${str}${sign_key}`
		newStr = encodeURIComponent(newStr).toLocaleUpperCase()
		let sign = md.hex_md5(newStr)
		return axios.get(`${path}?sign=${sign}&${str}`)
	}
}