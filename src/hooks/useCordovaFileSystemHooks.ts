import { ref } from 'vue'

/**
 * 文件系统条目类型
 */
export enum FileSystemEntryType {
  FILE = 'file',
  DIRECTORY = 'directory',
}

/**
 * 文件系统条目
 */
export interface FileSystemEntry {
  name: string
  fullPath: string
  type: FileSystemEntryType
  size?: number
  modificationTime?: Date
}

/**
 * 文件读取选项
 */
export interface ReadFileOptions {
  encoding?: string
  asText?: boolean
  asJson?: boolean
}

/**
 * 文件写入选项
 */
export interface WriteFileOptions {
  append?: boolean
  createIfNotExists?: boolean
}

/**
 * 文件系统错误
 */
export class FileSystemError extends Error {
  code: number

  constructor(message: string, code: number) {
    super(message)
    this.name = 'FileSystemError'
    this.code = code
  }
}

/**
 * 文件系统代理层
 * 基于cordova-plugin-file插件，提供文件系统操作功能
 */
export function useCordovaFileSystemHooks() {
  const isAvailable = ref(false)
  const isReady = ref(false)

  // 常用目录路径
  const directories = ref({
    dataDirectory: '',
    cacheDirectory: '',
    documentsDirectory: '',
    externalDataDirectory: '',
    externalCacheDirectory: '',
    externalRootDirectory: '',
  })

  /**
   * 初始化文件系统
   * 在应用启动时调用
   */
  function init(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!(window as any).cordova) {
        isAvailable.value = false
        reject(new Error('Cordova is not available'))
        return
      }

      document.addEventListener('deviceready', () => {
        if (!(window as any).cordova.file) {
          isAvailable.value = false
          reject(new Error('Cordova File plugin is not available'))
          return
        }

        isAvailable.value = true

        // 获取常用目录路径
        const cordovaFile = (window as any).cordova.file
        directories.value = {
          dataDirectory: cordovaFile.dataDirectory,
          cacheDirectory: cordovaFile.cacheDirectory,
          documentsDirectory: cordovaFile.documentsDirectory,
          externalDataDirectory: cordovaFile.externalDataDirectory,
          externalCacheDirectory: cordovaFile.externalCacheDirectory,
          externalRootDirectory: cordovaFile.externalRootDirectory,
        }

        isReady.value = true
        resolve()
      }, false)
    })
  }

  /**
   * 获取文件系统
   * @param type 文件系统类型，默认为PERSISTENT
   * @param size 请求的文件系统大小，默认为0（不限制）
   */
  function requestFileSystem(type: number = 1, size: number = 0): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!isAvailable.value) {
        reject(new Error('File system is not available'))
        return
      }

      (window as any).requestFileSystem(type, size, resolve, reject)
    })
  }

  /**
   * 解析本地文件系统URL
   * @param url 本地文件系统URL
   */
  function resolveLocalFileSystemURL(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!isAvailable.value) {
        reject(new Error('File system is not available'))
        return
      }

      (window as any).resolveLocalFileSystemURL(url, resolve, reject)
    })
  }

  /**
   * 获取目录
   * @param path 目录路径
   * @param options 选项
   */
  async function getDirectory(path: string, options: { create?: boolean, exclusive?: boolean } = {}): Promise<any> {
    try {
      // 如果是完整路径，直接解析
      if (path.startsWith('file://') || path.startsWith('cdvfile://')) {
        return await resolveLocalFileSystemURL(path)
      }

      // 如果是相对路径，从数据目录开始
      const parts = path.split('/').filter(p => p.length > 0)
      let directoryEntry = await resolveLocalFileSystemURL(directories.value.dataDirectory)

      for (const part of parts) {
        directoryEntry = await new Promise((resolve, reject) => {
          directoryEntry.getDirectory(part, options, resolve, reject)
        })
      }

      return directoryEntry
    }
    catch (error) {
      throw new FileSystemError(`Failed to get directory: ${path}`, (error as any).code || 0)
    }
  }

  /**
   * 获取文件
   * @param path 文件路径
   * @param options 选项
   */
  async function getFile(path: string, options: { create?: boolean, exclusive?: boolean } = {}): Promise<any> {
    try {
      // 如果是完整路径，直接解析
      if (path.startsWith('file://') || path.startsWith('cdvfile://')) {
        return await resolveLocalFileSystemURL(path)
      }

      // 如果是相对路径，从数据目录开始
      const parts = path.split('/').filter(p => p.length > 0)
      const fileName = parts.pop()

      if (!fileName) {
        throw new FileSystemError('Invalid file path', 0)
      }

      let directoryEntry = await resolveLocalFileSystemURL(directories.value.dataDirectory)

      for (const part of parts) {
        directoryEntry = await new Promise((resolve, reject) => {
          directoryEntry.getDirectory(part, { create: true }, resolve, reject)
        })
      }

      return await new Promise((resolve, reject) => {
        directoryEntry.getFile(fileName, options, resolve, reject)
      })
    }
    catch (error) {
      throw new FileSystemError(`Failed to get file: ${path}`, (error as any).code || 0)
    }
  }

  /**
   * 创建目录
   * @param path 目录路径
   * @param recursive 是否递归创建
   */
  async function createDirectory(path: string, recursive: boolean = true): Promise<any> {
    try {
      const parts = path.split('/').filter(p => p.length > 0)
      let directoryEntry = await resolveLocalFileSystemURL(directories.value.dataDirectory)

      if (recursive) {
        for (const part of parts) {
          directoryEntry = await new Promise((resolve, reject) => {
            directoryEntry.getDirectory(part, { create: true }, resolve, reject)
          })
        }
        return directoryEntry
      }
      else {
        const dirName = parts.pop()
        if (!dirName) {
          throw new FileSystemError('Invalid directory path', 0)
        }

        for (const part of parts) {
          directoryEntry = await new Promise((resolve, reject) => {
            directoryEntry.getDirectory(part, { create: false }, resolve, reject)
          })
        }

        return await new Promise((resolve, reject) => {
          directoryEntry.getDirectory(dirName, { create: true, exclusive: true }, resolve, reject)
        })
      }
    }
    catch (error) {
      throw new FileSystemError(`Failed to create directory: ${path}`, (error as any).code || 0)
    }
  }

  /**
   * 检查文件或目录是否存在
   * @param path 路径
   */
  async function exists(path: string): Promise<boolean> {
    try {
      await resolveLocalFileSystemURL(directories.value.dataDirectory + path)
      return true
    }
    // eslint-disable-next-line unused-imports/no-unused-vars
    catch (error) {
      return false
    }
  }

  /**
   * 列出目录内容
   * @param path 目录路径
   */
  async function listDirectory(path: string): Promise<FileSystemEntry[]> {
    try {
      const directoryEntry = await getDirectory(path, { create: false })

      return new Promise((resolve, reject) => {
        const reader = directoryEntry.createReader()
        reader.readEntries(
          (entries: any[]) => {
            const result: FileSystemEntry[] = entries.map(entry => ({
              name: entry.name,
              fullPath: entry.fullPath,
              type: entry.isDirectory ? FileSystemEntryType.DIRECTORY : FileSystemEntryType.FILE,
            }))

            // 获取文件的额外信息
            Promise.all(
              result.map(async (item) => {
                if (item.type === FileSystemEntryType.FILE) {
                  try {
                    const fileEntry = await resolveLocalFileSystemURL(directories.value.dataDirectory + item.fullPath)
                    const fileInfo = await new Promise<any>((resolve, reject) => {
                      fileEntry.file(resolve, reject)
                    })

                    item.size = fileInfo.size
                    item.modificationTime = new Date(fileInfo.lastModifiedDate)
                  }
                  catch (error) {
                    console.error('Failed to get file info', error)
                  }
                }
                return item
              }),
            ).then(resolve).catch(reject)
          },
          reject,
        )
      })
    }
    catch (error) {
      throw new FileSystemError(`Failed to list directory: ${path}`, (error as any).code || 0)
    }
  }

  /**
   * 删除文件
   * @param path 文件路径
   */
  async function removeFile(path: string): Promise<void> {
    try {
      const fileEntry = await getFile(path, { create: false })

      return new Promise((resolve, reject) => {
        fileEntry.remove(resolve, reject)
      })
    }
    catch (error) {
      throw new FileSystemError(`Failed to remove file: ${path}`, (error as any).code || 0)
    }
  }

  /**
   * 删除目录
   * @param path 目录路径
   * @param recursive 是否递归删除
   */
  async function removeDirectory(path: string, recursive: boolean = false): Promise<void> {
    try {
      const directoryEntry = await getDirectory(path, { create: false })

      return new Promise((resolve, reject) => {
        if (recursive) {
          directoryEntry.removeRecursively(resolve, reject)
        }
        else {
          directoryEntry.remove(resolve, reject)
        }
      })
    }
    catch (error) {
      throw new FileSystemError(`Failed to remove directory: ${path}`, (error as any).code || 0)
    }
  }

  /**
   * 复制文件
   * @param sourcePath 源文件路径
   * @param targetPath 目标文件路径
   * @param overwrite 是否覆盖已存在的文件
   */
  async function copyFile(sourcePath: string, targetPath: string, overwrite: boolean = false): Promise<any> {
    try {
      const sourceFileEntry = await getFile(sourcePath, { create: false })

      // 解析目标路径
      const parts = targetPath.split('/').filter(p => p.length > 0)
      const fileName = parts.pop()

      if (!fileName) {
        throw new FileSystemError('Invalid target path', 0)
      }

      let targetDirEntry = await resolveLocalFileSystemURL(directories.value.dataDirectory)

      for (const part of parts) {
        targetDirEntry = await new Promise((resolve, reject) => {
          targetDirEntry.getDirectory(part, { create: true }, resolve, reject)
        })
      }

      // 如果目标文件已存在且不覆盖，则抛出错误
      if (!overwrite) {
        try {
          await new Promise((resolve, reject) => {
            targetDirEntry.getFile(fileName, { create: false }, resolve, reject)
          })
          throw new FileSystemError(`Target file already exists: ${targetPath}`, 0)
        }
        catch (error) {
          // 文件不存在，可以继续
          if ((error as any).code !== 1) {
            throw error
          }
        }
      }

      return new Promise((resolve, reject) => {
        sourceFileEntry.copyTo(targetDirEntry, fileName, resolve, reject)
      })
    }
    catch (error) {
      throw new FileSystemError(`Failed to copy file: ${sourcePath} to ${targetPath}`, (error as any).code || 0)
    }
  }

  /**
   * 移动文件
   * @param sourcePath 源文件路径
   * @param targetPath 目标文件路径
   * @param overwrite 是否覆盖已存在的文件
   */
  async function moveFile(sourcePath: string, targetPath: string, overwrite: boolean = false): Promise<any> {
    try {
      const sourceFileEntry = await getFile(sourcePath, { create: false })

      // 解析目标路径
      const parts = targetPath.split('/').filter(p => p.length > 0)
      const fileName = parts.pop()

      if (!fileName) {
        throw new FileSystemError('Invalid target path', 0)
      }

      let targetDirEntry = await resolveLocalFileSystemURL(directories.value.dataDirectory)

      for (const part of parts) {
        targetDirEntry = await new Promise((resolve, reject) => {
          targetDirEntry.getDirectory(part, { create: true }, resolve, reject)
        })
      }

      // 如果目标文件已存在且不覆盖，则抛出错误
      if (!overwrite) {
        try {
          await new Promise((resolve, reject) => {
            targetDirEntry.getFile(fileName, { create: false }, resolve, reject)
          })
          throw new FileSystemError(`Target file already exists: ${targetPath}`, 0)
        }
        catch (error) {
          // 文件不存在，可以继续
          if ((error as any).code !== 1) {
            throw error
          }
        }
      }

      return new Promise((resolve, reject) => {
        sourceFileEntry.moveTo(targetDirEntry, fileName, resolve, reject)
      })
    }
    catch (error) {
      throw new FileSystemError(`Failed to move file: ${sourcePath} to ${targetPath}`, (error as any).code || 0)
    }
  }

  /**
   * 读取文件内容
   * @param path 文件路径
   * @param options 读取选项
   */
  async function readFile(path: string, options: ReadFileOptions = {}): Promise<string | ArrayBuffer | object> {
    try {
      const fileEntry = await getFile(path, { create: false })

      const file = await new Promise<any>((resolve, reject) => {
        fileEntry.file(resolve, reject)
      })

      return new Promise((resolve, reject) => {
        const reader = new FileReader()

        reader.onloadend = function () {
          try {
            if (options.asJson) {
              resolve(JSON.parse(reader.result as string))
            }
            else {
              if (reader.result === null) {
                reject(new Error('File read result is null'))
              }
              else {
                resolve(reader.result)
              }
            }
          }
          catch (error) {
            reject(error)
          }
        }

        reader.onerror = function (error) {
          reject(error)
        }

        if (options.asText || options.asJson) {
          reader.readAsText(file, options.encoding || 'UTF-8')
        }
        else {
          reader.readAsArrayBuffer(file)
        }
      })
    }
    catch (error) {
      throw new FileSystemError(`Failed to read file: ${path}`, (error as any).code || 0)
    }
  }

  /**
   * 写入内容到文件
   * @param path 文件路径
   * @param data 要写入的数据
   * @param options 写入选项
   */
  async function writeFile(path: string, data: string | ArrayBuffer | object, options: WriteFileOptions = {}): Promise<void> {
    try {
      // 如果数据是对象，转换为JSON字符串
      const content = typeof data === 'object' && !(data instanceof ArrayBuffer)
        ? JSON.stringify(data)
        : data

      const fileEntry = await getFile(path, { create: options.createIfNotExists !== false })

      return new Promise((resolve, reject) => {
        fileEntry.createWriter(
          (fileWriter: any) => {
            fileWriter.onwriteend = function () {
              resolve()
            }

            fileWriter.onerror = function (error: any) {
              reject(error)
            }

            if (options.append) {
              fileWriter.seek(fileWriter.length)
            }

            if (content instanceof ArrayBuffer) {
              fileWriter.write(content)
            }
            else {
              const blob = new Blob([content as string], { type: 'text/plain' })
              fileWriter.write(blob)
            }
          },
          reject,
        )
      })
    }
    catch (error) {
      throw new FileSystemError(`Failed to write file: ${path}`, (error as any).code || 0)
    }
  }

  /**
   * 获取文件URL
   * @param path 文件路径
   */
  async function getFileUrl(path: string): Promise<string> {
    try {
      const fileEntry = await getFile(path, { create: false })
      return fileEntry.toURL()
    }
    catch (error) {
      throw new FileSystemError(`Failed to get file URL: ${path}`, (error as any).code || 0)
    }
  }

  /**
   * 获取文件元数据
   * @param path 文件路径
   */
  async function getMetadata(path: string): Promise<{ modificationTime: Date, size: number }> {
    try {
      const entry = await resolveLocalFileSystemURL(directories.value.dataDirectory + path)

      return new Promise((resolve, reject) => {
        entry.getMetadata(
          (metadata: any) => {
            resolve({
              modificationTime: new Date(metadata.modificationTime),
              size: metadata.size,
            })
          },
          reject,
        )
      })
    }
    catch (error) {
      throw new FileSystemError(`Failed to get metadata: ${path}`, (error as any).code || 0)
    }
  }

  /**
   * 从网络下载文件
   * @param url 文件URL
   * @param targetPath 目标路径
   */
  async function downloadFile(url: string, targetPath: string): Promise<void> {
    try {
      // const response = await axios.get(url, { responseType: 'blob' })
      const response = await fetch(url)
      const blob = await response.blob()
      await writeFile(targetPath, await blob.arrayBuffer(), { createIfNotExists: true })
    }
    catch (error) {
      throw new FileSystemError(`Failed to download file: ${url} to ${targetPath}`, (error as any).code || 0)
    }
  }

  // 从现有的useFile.ts导入的功能

  /**
   * 获取目标目录
   */
  function getTargetDir() {
    return (window as any).cordova.file.dataDirectory
  }

  /**
   * 读取本地文件
   * @param uuid 本地唯一标识
   */
  async function readLocalFile(uuid: string): Promise<any> {
    return new Promise((resolve, reject) => {
      (window as any).resolveLocalFileSystemURL(
        getTargetDir() + uuid,
        (fileEntry: any) => {
          fileEntry.file(
            (file: any) => {
              if (file instanceof File) {
                resolve(file)
              }
              else {
                const newFile = new File([file], uuid, {
                  type: file.type || 'application/octet-stream',
                  lastModified: file.lastModified || Date.now(),
                })
                resolve(newFile)
              }
            },
            (err: any) => reject(err),
          )
        },
        (err: any) => reject(err),
      )
    })
  }

  /**
   * 获取本地文件URL
   * @param uuid 本地唯一标识
   */
  async function getLocalFileUrl(uuid: string): Promise<string> {
    return new Promise((resolve, reject) => {
      readLocalFile(uuid).then((res) => {
        if (!(res as any).localURL) {
          resolve(URL.createObjectURL(res))
        }
        else {
          resolve((res as any).localURL)
        }
      }).catch((e) => {
        reject(e)
      })
    })
  }

  /**
   * 删除本地文件
   * @param uuid 本地唯一标识
   */
  function deleteLocalFile(uuid: string) {
    return new Promise<void>((resolve, reject) => {
      (window as any).resolveLocalFileSystemURL(
        getTargetDir(),
        (dirEntry: any) => {
          dirEntry.getFile(
            uuid,
            { create: false },
            (fileEntry: any) => {
              fileEntry.remove(
                () => resolve(),
                (err: any) => reject(err),
              )
            },
          )
        },
      )
    })
  }

  /**
   * 获取文件后缀
   * @param filename 文件名
   */
  function getFileSuffix(filename: string) {
    const arr = filename.split('.')
    return arr[arr.length - 1]
  }

  /**
   * 上传文件（离线）
   * @param uuid 本地唯一标识
   * @param file 上传文件
   */
  async function uploadFileOffline(uuid: string, file: File | Blob): Promise<Blob | void> {
    let saveData: Blob

    if (file instanceof File) {
      const reader = new FileReader()
      saveData = await new Promise<Blob>((resolve, reject) => {
        reader.onloadend = async function () {
          resolve(new Blob([reader.result as any]))
        }
        reader.onerror = reject
        reader.readAsArrayBuffer(file)
      })
    }
    else if (file instanceof Blob) {
      saveData = file
    }
    else {
      throw new TypeError('上传文件异常！')
    }

    return new Promise((resolve, reject) => {
      // 写入文件
      (window as any).resolveLocalFileSystemURL(getTargetDir(), (dirEntry: any) => {
        dirEntry.getFile(
          uuid,
          { create: true, exclusive: false },
          (fileEntry: any) => {
            fileEntry.createWriter((fileWriter: any) => {
              fileWriter.onwriteend = resolve
              fileWriter.onerror = reject
              fileWriter.write(saveData)
            }, reject)
          },
          reject,
        )
      }, reject)
    })
  }

  /**
   * 获取HTTP文件URL
   * @param fileUrl 文件URL
   */
  async function getHttpFileUrl(_fileUrl: string) {
    try {
      // const response = await HtApi.request({
      //   method: 'GET',
      //   path: fileUrl,
      //   format: 'blob',
      // });
      // return URL.createObjectURL(response);
    }
    catch (error) {
      console.error('获取文件URL失败:', error)
      throw error
    }
  }

  return {
    // 状态
    isAvailable,
    isReady,
    directories,

    // 初始化
    init,

    // 基础文件系统操作
    requestFileSystem,
    resolveLocalFileSystemURL,
    getDirectory,
    getFile,

    // 目录操作
    createDirectory,
    exists,
    listDirectory,
    removeDirectory,

    // 文件操作
    readFile,
    writeFile,
    removeFile,
    copyFile,
    moveFile,
    getFileUrl,
    getMetadata,
    downloadFile,

    // 从现有useFile.ts导入的功能
    getTargetDir,
    readLocalFile,
    getLocalFileUrl,
    deleteLocalFile,
    getFileSuffix,
    uploadFileOffline,
    getHttpFileUrl,
  }
}
