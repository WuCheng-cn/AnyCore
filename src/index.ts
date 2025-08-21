import * as anyDecorator from './decorator/index'
import * as anyEntity from './entity/index'
import * as anyEnum from './enum/index'
import * as anyHelper from './helper/index'
import * as anyInterface from './interface/index'
import * as anyModel from './model/index'
import * as anyTypes from './types/index'

export default {
  ...anyDecorator,
  ...anyEntity,
  ...anyEnum,
  ...anyHelper,
  ...anyInterface,
  ...anyModel,
  ...anyTypes,
}
