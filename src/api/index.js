import { GET, POST, PUT, DELETE } from './http'

// 获取简单表格
export const getTableData = ({ page, pageSize }) =>
  GET(`/getTable?page=${page}&pageSize=${pageSize}`)

// 获取 page 表格
export const getPageData = ({ page, pageSize }) =>
  GET(`/getPage?page=${page}&pageSize=${pageSize}`)
// 新增 page
export const postPageData = data => POST('/getPage', data)
// 修改 page
export const putPageData = data => PUT(`/getPage?id=${data.id}`, data)
// 删除 page
export const deletePageData = id => DELETE(`/getPage?id=${id}`)

export const getAuths = ({
  page,
  pageSize,
  company,
  subCompany,
  department,
  job,
  role,
  query
}) => {
  let url = `/getAuths?page=${page}&pageSize=${pageSize}`
  if (company) {
    url = `/getAuths?page=${page}&pageSize=${pageSize}&company=${company}`
  }
  if (subCompany) {
    url = `/getAuths?page=${page}&pageSize=${pageSize}&subCompany=${subCompany}`
  }
  if (department) {
    url = `/getAuths?page=${page}&pageSize=${pageSize}&department=${department}`
  }
  if (job) {
    url = `/getAuths?page=${page}&pageSize=${pageSize}&job=${job}`
  }
  if (role) {
    url = `/getAuths?page=${page}&pageSize=${pageSize}&role=${role}`
  }
  if (query) {
    url = `/getAuths?page=${page}&pageSize=${pageSize}&query=${query}`
  }
  return GET(url)
}

export const postAuth = data => PUT(`/getAuths?id=${data.id}`, data)

