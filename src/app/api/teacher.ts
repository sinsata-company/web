import axios from 'axios'
import { basicGet, basicNotAuthorizedGet, basicPost } from './base'
import { PageRes } from './type'
import { TeacherDetailDto, TeacherListDto } from './data'

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
