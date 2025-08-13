import { ref } from 'vue'

/**
 * 相机操作hooks，基于cordova-plugin-camera@8.0实现
 * 提供拍摄照片、从相册选择照片功能及错误处理
 * @returns {object} 包含照片数据、错误信息及操作方法
 */
export function useCordovaCameraHooks() {
  // 照片数据(base64格式)
  const photo = ref<string | null>(null)
  // 错误信息
  const error = ref<string | null>(null)
  // 加载状态
  const isLoading = ref<boolean>(false)

  /**
   * 拍摄照片
   * @param {object} options - 相机配置选项
   * @param {number} [options.quality] - 照片质量(0-100)
   * @param {boolean} [options.allowEdit] - 是否允许编辑
   * @returns {Promise<string | null>} 照片base64数据或null
   */
  const takePhoto = async (options: { quality?: number, allowEdit?: boolean } = {}): Promise<string | null> => {
    isLoading.value = true
    error.value = null

    try {
      // 检查cordova相机插件是否可用
      if (!(window.navigator as any).camera) {
        throw new Error('Cordova相机插件未加载')
      }
      // 默认配置
      const cameraOptions = {
        quality: options.quality || 80,
        destinationType: (window as any).Camera.DestinationType.FILE_URI,
        sourceType: (window as any).Camera.PictureSourceType.CAMERA,
        allowEdit: options.allowEdit || false,
        encodingType: (window as any).Camera.EncodingType.JPEG,
        mediaType: (window as any).Camera.MediaType.PICTURE,
        correctOrientation: true, // 自动纠正方向
        saveToPhotoAlbum: false, // 是否保存到相册
      }

      // 调用相机插件
      const imageData = await new Promise<string>((resolve, reject) => {
        (window.navigator as any).camera.getPicture(
          (data: string) => resolve(data),
          (err: string) => reject(new Error(`相机操作失败: ${err}`)),
          cameraOptions,
        )
      })

      photo.value = imageData
      return photo.value
    }
    catch (err) {
      error.value = err instanceof Error ? err.message : '拍摄照片时发生错误'
      return null
    }
    finally {
      isLoading.value = false
    }
  }

  /**
   * 从相册选择照片
   * @param {object} options - 选择配置选项
   * @param {number} [options.quality] - 照片质量(0-100)
   * @param {boolean} [options.allowEdit] - 是否允许编辑
   * @returns {Promise<string | null>} 照片base64数据或null
   */
  const pickFromGallery = async (options: { quality?: number, allowEdit?: boolean } = {}): Promise<string | null> => {
    isLoading.value = true
    error.value = null

    try {
      if (!((window.navigator as any).camera)) {
        throw new Error('Cordova相机插件未加载')
      }

      const cameraOptions = {
        quality: options.quality || 80,
        destinationType: (window as any).Camera.DestinationType.DATA_URL,
        sourceType: (window as any).Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: options.allowEdit || false,
        encodingType: (window as any).Camera.EncodingType.JPEG,
        mediaType: (window as any).Camera.MediaType.PICTURE,
        correctOrientation: true,
      }

      const imageData = await new Promise<string>((resolve, reject) => {
        (window.navigator as any).camera.getPicture(
          (data: string) => resolve(data),
          (err: string) => reject(new Error(`选择照片失败: ${err}`)),
          cameraOptions,
        )
      })

      photo.value = `data:image/jpeg;base64,${imageData}`
      return photo.value
    }
    catch (err) {
      error.value = err instanceof Error ? err.message : '选择照片时发生错误'
      return null
    }
    finally {
      isLoading.value = false
    }
  }

  /**
   * 清除当前照片
   */
  const clearPhoto = () => {
    photo.value = null
  }

  return { photo, error, isLoading, takePhoto, pickFromGallery, clearPhoto }
}
