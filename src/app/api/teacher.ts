import axios from 'axios'
import { basicGet, basicNotAuthorizedGet } from './base'
import { basicPost } from '../../../src/api/base'
import { PageRes } from './type'
import { TeacherDetailDto, TeacherListDto, UnavailableTimeDTO, UnavailableTimeResponse } from './data'

export enum SearchType {
  NEW = 'NEW',
  POPULAR = 'POPULAR',
  VIEW = 'VIEW',
  RECENT = 'RECENT',
  REVIEW = 'REVIEW',
}

export const getTeacherList = async (searchType: SearchType, page: number) => {
  const response = await basicNotAuthorizedGet(
    `/teachers?method=${searchType}&page=${page}`
  )
  const data = response as PageRes<TeacherListDto>
  return data
}

export const getTeacherLikeList = async (searchType: SearchType, page: number) => {
  const response = await basicGet(
    `/teachers/liked?method=${searchType}&page=${page}`
  )
  const data = response as PageRes<TeacherListDto>
  return data
}

export const getTeacherRecentList = async (searchType: string, page: number) => {
  const response = await basicGet(
    `/teachers/recent?method=${searchType}&page=${page}`
  )
  const data = response as PageRes<TeacherListDto>
  return data
}



export interface summary {
  teachers: number
  reservations: number
}

export const getSummary = async () => {
  const response = await basicNotAuthorizedGet(`/teachers/summary`)
  const data = response
  return data as summary
}

export const getTeachersByCategory = async (
  searchType: SearchType,
  page: number,
  category: string
) => {
  const response = await basicNotAuthorizedGet(
    `/teachers/category?method=${searchType}&page=${page}&type=${category}`
  )
  const data = response as PageRes<TeacherListDto>
  return data
}

export const getTeacherDetail = async (teacherId: String) => {
  const response = await basicGet(`/teachers/${teacherId}`)
  const data = response as TeacherDetailDto
  console.log(data?.images)
  return data
}

export const requestRecommendation = async (contents: string) => {
  const response = await basicPost(`/advice/request`, { contents })
  const data = response as string
  return data
}

export const getRecommendation = async (requestId: string) => {
  const response = await basicGet(`/advice/result/${requestId}`)
  const data = response as TeacherListDto[]
  return data
}

export const getUnavailableTimes = async (date: string) => {
  const response = await basicGet(`/unavailable-times?date=${date}`)
  const data = response as UnavailableTimeResponse[]  
  return data
}
export const getUnavailableTimesForUser = async (teacherId: string, date: string) => {
  const response = await basicGet(`/unavailable-times/${teacherId}?date=${date}`)
  const data = response as UnavailableTimeResponse[]  
  return data
}

export const saveUnavailableTimes = async (
  date: string, 
  times: string[], 
  action: 'add' | 'remove' | 'update' = 'add'
) => {
  const response = await basicPost('/unavailable-times', { 
    date, 
    times,
    action 
  })
  const data = response as string
  return data
}

export const getMyLikeTeachers = async () => {
  const response = await basicGet('/liked_teachers/myLikeTeachers')
  const data = response as TeacherListDto[]
  return data
}