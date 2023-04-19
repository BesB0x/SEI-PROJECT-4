import { Buffer } from 'buffer'
import axios from 'axios'


const tokenName = 'ATMOS-USER-TOKEN'

export const getPayload = () => {
  const token = localStorage.getItem(tokenName)
  if (!token) return 
  const splitToken = token.split('.')
  const payloadString = splitToken[1]
  return JSON.parse(Buffer.from(payloadString, 'base64'))
}

// for Navbar changes
export const isAuthenticated = () => {
  const payload = getPayload()
  if (!payload) return false
  const currentTime = Date.now() / 1000
  return currentTime < payload.exp
}

export const removeToken = () => {
  localStorage.removeItem(tokenName)
}

export const getToken = () => {
  return localStorage.getItem(tokenName)
  
}

export const authenticated = axios.create()
authenticated.interceptors.request.use(config => {
  config.headers['Authorization'] = `Bearer ${getToken()}`
  return config
})

// Return logged in user's ID
export const loggedInUser = () => {
  const payload = getPayload()
  if (!payload) return 
  return payload.sub 
}

// For Edit and Delete in User Dashboard
export const userIsOwner = (atmos) => {
  const payload = getPayload()
  if (!payload) return
  if (atmos) {
    return payload.sub === atmos.owner.id
  }
}

