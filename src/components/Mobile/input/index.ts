import { EFormItemType } from '../../../enum/EFormItemType'
import InputArea from './InputArea.vue'
import InputCheckBox from './InputCheckBox.vue'
import InputDate from './InputDate.vue'
import InputDateRange from './InputDateRange.vue'
import InputNumber from './InputNumber.vue'
import InputRadio from './InputRadio.vue'
import InputSelect from './InputSelect.vue'
import InputSelector from './InputSelector.vue'
import InputSign from './InputSign.vue'
import InputString from './InputString.vue'
import InputSwitch from './InputSwitch.vue'
import InputTime from './InputTime.vue'
import InputTimeRange from './InputTimeRange.vue'
import InputUpload from './InputUpload.vue'

type FormItemTypeMapping = {
  [K in EFormItemType]: any;
}

export const componentsMobileMap: Partial<FormItemTypeMapping> = {
  [EFormItemType.INPUT]: InputString,
  [EFormItemType.INPUT_NUMBER]: InputNumber,
  [EFormItemType.SELECT]: InputSelect,
  [EFormItemType.TEXTAREA]: InputArea,
  [EFormItemType.CHECKBOX]: InputCheckBox,
  [EFormItemType.RADIO]: InputRadio,
  [EFormItemType.SWITCH]: InputSwitch,
  [EFormItemType.DATE]: InputDate,
  [EFormItemType.TIME]: InputTime,
  [EFormItemType.DATE_RANGE]: InputDateRange,
  [EFormItemType.TIME_RANGE]: InputTimeRange,
  [EFormItemType.UPLOAD]: InputUpload,
  [EFormItemType.SIGN]: InputSign,
  [EFormItemType.INPUT_SELECTOR]: InputSelector,
}
