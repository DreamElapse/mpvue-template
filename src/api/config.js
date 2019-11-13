const env = process.env.NODE_ENV
const version = process.env.VERSION

// todo 测试专用记得更新
const DEV = {
  api: 'https://zhidian-api.jerryf.cn',
  image: 'https://img.jerryf.cn/defaults',
  upload: 'https://zhidian-api.jerryf.cn',
  imRecord: 'https://data-analysis-api.jkweixin.net'
}

const TEST = {
  api: 'https://zhidian-api.jkweixin.net',
  image: 'https://img.jkweixin.net/defaults',
  upload: 'https://zhidian-api.jkweixin.net',
  imRecord: 'https://data-analysis-api.jkweixin.net'
}

const PROD = {
  api: 'https://zhidian-api.jkweixin.com' + version,
  image: 'https://img.jkweixin.com/defaults',
  upload: 'https://zhidian-api.jkweixin.com' + version,
  imRecord: 'https://data-analysis-api.jkweixin.com'
}

export const baseURL = env === 'production' ? PROD : env === 'test' ? TEST : DEV

export const ERR_OK = 0
export const TIME_OUT = 10000
export const ERR_NO = -404
export const TOKEN_OUT = 10000 // token 失效
