import axios from 'axios'
import { basicGet } from './base'
import { PageRes } from './type'
import { TeacherListDto } from './data'

export enum SearchType {
  NEW = 'NEW',
  POPULAR = 'POPULAR',
  VIEW = 'VIEW',
  RECENT = 'RECENT',
}

export const getTeacherList = async (searchType: SearchType) => {
  const response = await basicGet(`/teachers?method=${searchType}`)
  const data = response as PageRes<TeacherListDto>
  return data
}
