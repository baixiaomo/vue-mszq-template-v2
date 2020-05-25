import Mock from 'mockjs'

export const random = Mock.Random

export const template = data => {
  return Mock.mock(data)
}
