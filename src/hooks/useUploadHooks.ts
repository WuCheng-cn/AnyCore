import { showDialog } from 'vant'
import { useCordovaFileSystemHooks } from './useCordovaFileSystemHooks'

export interface UploadObject {
  /** # 文件名 */
  name: string
  /** # 文件大小 */
  size: number
  /** # 文件类型 */
  contentType: string
  /** # 文件对象（离线模式下即唯一标识uuid） */
  object: string
  /** # 文件状态 */
  status: 'uploading' | 'done' | 'failed'
  /** # 文件信息 */
  message: string
  /** # 文件对象 */
  file?: File
}

export function useUploadHooks() {
  const { getFileSuffix, uploadFileOffline } = useCordovaFileSystemHooks()
  /** # 在线模式文件处理 */
  async function afterRead(file: any) {
    try {
      file.status = 'uploading'
      file.message = '上传中...'
      // const res = await HtApi.common.postUpload({ file: file.file! });
      file.name = file.file!.name
      file.size = file.file!.size
      file.contentType = file.file!.type
      // file.object = res.object;
      file.status = 'done'
      file.message = '上传成功'
    }
    // eslint-disable-next-line unused-imports/no-unused-vars
    catch (error) {
      file.status = 'failed'
      file.message = '上传失败'
    }
  }

  /** # 离线模式文件处理 */
  async function offlineAfterRead(file: any) {
    try {
      file.status = 'uploading'
      file.message = '本地保存中...'
      // 唯一文件标识
      const uuid = `${Date.now()}.${getFileSuffix(file.file.name)}`

      // 获取文件内容并写入本地
      const reader = new FileReader()
      const fileContent: File = file.file!
      await new Promise((resolve, reject) => {
        reader.onloadend = async function () {
          // 离线存储逻辑
          uploadFileOffline(uuid, new Blob([reader.result as any])).then((res) => {
            resolve(res)
          }).catch((e) => {
            reject(e)
          })
        }
        reader.onerror = reject
        reader.readAsArrayBuffer(fileContent)
      })
      file.name = file.file!.name
      file.size = file.file!.size
      file.contentType = file.file!.type
      file.object = uuid
      file.status = 'done'
      file.message = '本地保存成功'
    }
    // eslint-disable-next-line unused-imports/no-unused-vars
    catch (error) {
      file.status = 'failed'
      file.message = '本地保存失败'
    }
  }

  function onOversize(file: any) {
    const fileName = file.file?.name
    showDialog({
      message: `文件 [${fileName}] 超出大小限制，请重新选择`,
    })
  }

  return {
    afterRead,
    offlineAfterRead,
    onOversize,
  }
}
