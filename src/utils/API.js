const root3 = 'http://47.93.125.117';
const root1 = 'http://127.0.0.1';
const root2 = 'http://nmgjg.unilogger.cn';
const base = root2 +':8090/base'
const control = root2 +':8090/control'
const rotation = root2 +':8090/rotation'
const irrigate = root2 +":8011/jsgg/yxkz/tjbg/ggList.html?sysId="
// const base = 'http://127.0.0.1:8080/base'
// const control = 'http://127.0.0.1:8080/control'
const consoleApiUrl =  root2 +":8070/privilege";
// const base = 'http://nmgjg.unilogger.cn:8090/base'
// const control = 'http://nmgjg.unilogger.cn:8090/control'
// const consoleApiUrl =  "http://nmgjg.unilogger.cn:8070/privilege";

const URL = {
	LOGIN: `${consoleApiUrl}/access/login`, //用户登录
  getSysByUserId: `${base}/phoneAutoIrriResource/getSysByUserId`, //获取系统列表
  getPWBySysId: `${base}/phoneAutoIrriResource/getPWBySysId`,    // 获取机井信息
  getRotPlanWater: `${base}/phoneAutoIrriResource/getRotPlanWater`,    // 获取灌水计划灌水量
  getIrrPlanBySysId: `${base}/phoneAutoIrriResource/getIrrPlanBySysId`,    // 获取主页统计信息
  getPlanBySysId: `${control}/automaticIrrResource/getPlanBySysId`,    // 获取灌水计划信息
  getRotBySysId: `${control}/automaticIrrResource/getRotBySysId`,    // 获取轮灌信息
  getRotPlanById: `${control}/automaticIrrResource/getRotPlanById`,    // 获取轮灌计划执行信息
  getRotPlanBySysId: `${control}/automaticIrrResource/getRotPlanBySysId`,    // 获取轮灌计划信息
  setAffix: `${control}/automaticIrrResource/setAffix`,    // 获取轮灌计划信息
  setBranch: `${control}/automaticIrrResource/setBranch`,    // 获取轮灌计划信息
  setlRotPlan: `${control}/automaticIrrResource/setlRotPlan`,    // 设置轮灌计划
  getAllBranchsBySysId: `${control}/geoVector/gettree`,    // 获取系统下所有支管
  irrigate: `${irrigate}`,    // 获取系统下所有支管
  changeStatus: `${rotation}/rotation/changeStatus`,    // 获取系统下所有支管
}

Object.freeze(URL)

export { URL }