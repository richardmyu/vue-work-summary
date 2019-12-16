const COMPANYS = ['abc有限责任公司', '蓝狐责任有限公司', 'hk科技有限公司']
const SUBCOMPANYS = [
  'abc-修饰',
  'abc-富康',
  'abc-萨克',
  '蓝狐-蝴蝶',
  '蓝狐-沃克',
  '蓝狐-贝克',
  'hk-健康',
  'hk-快快'
]
const DEPARTMENTS = ['技术部', '研发部', '人事部']
const JOBS = ['前端', '后台', 'UI']
const NAMES = [
  '许艳',
  '尹平',
  '吴涛',
  '石娜',
  '龙磊',
  '金军',
  '毛丽',
  '陈刚',
  '万平',
  '杨强'
]
const ROLES = ['客户', '开发', '管理']
const MODELS = {
  model1: ['查', '增', '改', '删'],
  model2: ['查', '增', '改', '删'],
  model3: ['查', '增', '改', '删'],
  model4: ['查', '增', '改', '删']
}

export default () => [
  {
    company: COMPANYS[0],
    subCompany: SUBCOMPANYS[0],
    department: DEPARTMENTS[0],
    job: JOBS[0],
    name: NAMES[0],
    id: 'C-0001',
    role: ROLES[0],
    model: {
      model1: [MODELS.model1[0]],
      model2: [MODELS.model2[0]],
      model3: [MODELS.model3[0]]
    }
  },
  {
    company: COMPANYS[0],
    subCompany: SUBCOMPANYS[1],
    department: DEPARTMENTS[1],
    job: JOBS[1],
    name: NAMES[1],
    id: 'C-0002',
    role: ROLES[1],
    model: {
      model1: [MODELS.model1[0], MODELS.model1[1], MODELS.model1[2]],
      model2: [MODELS.model2[0], MODELS.model2[1], MODELS.model2[2]],
      model3: [MODELS.model3[0], MODELS.model3[1], MODELS.model3[2]],
      model4: [MODELS.model4[0], MODELS.model4[1], MODELS.model4[2]]
    }
  },
  {
    company: COMPANYS[0],
    subCompany: SUBCOMPANYS[2],
    department: DEPARTMENTS[2],
    job: JOBS[2],
    name: NAMES[2],
    id: 'C-0003',
    role: ROLES[2],
    model: {
      model1: MODELS.model1,
      model2: MODELS.model2,
      model3: MODELS.model3,
      model4: MODELS.model4
    }
  },
  {
    company: COMPANYS[1],
    subCompany: SUBCOMPANYS[3],
    department: DEPARTMENTS[0],
    job: JOBS[0],
    name: NAMES[3],
    id: 'C-0004',
    role: ROLES[0],
    model: {
      model1: [MODELS.model1[0]],
      model2: [MODELS.model2[0]],
      model3: [MODELS.model3[0]]
    }
  },
  {
    company: COMPANYS[1],
    subCompany: SUBCOMPANYS[4],
    department: DEPARTMENTS[1],
    job: JOBS[1],
    name: NAMES[4],
    id: 'C-0005',
    role: ROLES[1],
    model: {
      model1: [MODELS.model1[0], MODELS.model1[1], MODELS.model1[2]],
      model2: [MODELS.model2[0], MODELS.model2[1], MODELS.model2[2]],
      model3: [MODELS.model3[0], MODELS.model3[1], MODELS.model3[2]],
      model4: [MODELS.model4[0], MODELS.model4[1], MODELS.model4[2]]
    }
  },
  {
    company: COMPANYS[1],
    subCompany: SUBCOMPANYS[5],
    department: DEPARTMENTS[2],
    job: JOBS[2],
    name: NAMES[5],
    id: 'C-0006',
    role: ROLES[2],
    model: {
      model1: MODELS.model1,
      model2: MODELS.model2,
      model3: MODELS.model3,
      model4: MODELS.model4
    }
  },
  {
    company: COMPANYS[2],
    subCompany: SUBCOMPANYS[6],
    department: DEPARTMENTS[0],
    job: JOBS[0],
    name: NAMES[6],
    id: 'C-0007',
    role: ROLES[0],
    model: {
      model1: [MODELS.model1[0]],
      model2: [MODELS.model2[0]],
      model3: [MODELS.model3[0]]
    }
  },
  {
    company: COMPANYS[2],
    subCompany: SUBCOMPANYS[7],
    department: DEPARTMENTS[1],
    job: JOBS[1],
    name: NAMES[7],
    id: 'C-0008',
    role: ROLES[1],
    model: {
      model1: [MODELS.model1[0], MODELS.model1[1], MODELS.model1[2]],
      model2: [MODELS.model2[0], MODELS.model2[1], MODELS.model2[2]],
      model3: [MODELS.model3[0], MODELS.model3[1], MODELS.model3[2]],
      model4: [MODELS.model4[0], MODELS.model4[1], MODELS.model4[2]]
    }
  },
  {
    company: COMPANYS[2],
    subCompany: SUBCOMPANYS[7],
    department: DEPARTMENTS[2],
    job: JOBS[2],
    name: NAMES[8],
    id: 'C-0009',
    role: ROLES[2],
    model: {
      model1: MODELS.model1,
      model2: MODELS.model2,
      model3: MODELS.model3,
      model4: MODELS.model4
    }
  }
]
