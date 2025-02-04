import axios from 'axios'
import { basicGet } from './base'
import { PageRes } from './type'
import { TeacherDetailDto, TeacherListDto } from './data'

export enum SearchType {
  NEW = 'NEW',
  POPULAR = 'POPULAR',
  VIEW = 'VIEW',
  RECENT = 'RECENT',
}

export const getTeacherList = async (searchType: SearchType, page: number) => {
  const response = await basicGet(`/teachers?method=${searchType}&page=${page}`)
  const data = response as PageRes<TeacherListDto>
  return data
}

export const getTeacherDetail = async (teacherId: String) => {
  const response = await basicGet(`/teachers/${teacherId}`)
  const data = response as TeacherDetailDto
  return data
}
