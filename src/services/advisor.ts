import { dummyAdvisors } from '@/dummy/dummyTeacher'

export const getAllAdvisor = () => {
  return dummyAdvisors
}

export const getAdvisorInfo = (id: number) => {
  return dummyAdvisors.find((advisor) => advisor.id == id)
}

export const getCategoryAdvisor = (cat: string) => {
  return dummyAdvisors.filter((advisor) => advisor.type == cat)
}
