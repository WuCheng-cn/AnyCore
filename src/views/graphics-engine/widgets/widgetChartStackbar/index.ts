import type { ClassConstructor } from '@/anyThing/types/ClassConstructor'
import type { WidgetFormBase } from '../../entity/WidgetFormBase'
import image from '../../assets/VueUiStackbar.png'
import { NodeShape } from '../../config/NodeShapeConfig'
import { WidgetBaseEntity } from '../../entity/WidgetBase'
import { WidgetCategory } from '../../interface/IWidget'

const { resgistAsyncComponent } = useComponent()

const fromConfig = [
] as ClassConstructor<WidgetFormBase>[]

class WidgetChartStackBar extends WidgetBaseEntity<typeof fromConfig> {
  name = '堆叠条形图'
  nodeShape = NodeShape.CHART_STACK_BAR
  width = 400
  height = 300
  image = image
  category = WidgetCategory.Chart
  component = resgistAsyncComponent(() => import('./index.vue'))
}

export default new WidgetChartStackBar(fromConfig)
