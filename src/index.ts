import * as anyDecorator from './decorator/index'
import * as anyEntity from './entity/index'
import * as anyEnum from './enum/index'
import * as anyHelper from './helper/index'
import * as anyModel from './model/index'

export * from './interface/index'
export * from './types/index'

export default {
  ...anyDecorator,
  ...anyEntity,
  ...anyEnum,
  ...anyHelper,
  ...anyModel,
}
