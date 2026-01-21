import { describe, expect, it } from 'vitest'
import { AnyFileHelper } from './AnyFileHelper'

describe('anyFileHelper', () => {
  describe('getFileSizeFriendly', () => {
    it('应该正确转换字节数为可读格式', () => {
      expect(AnyFileHelper.getFileSizeFriendly(0)).toBe('0.00B')
      expect(AnyFileHelper.getFileSizeFriendly(1023)).toBe('1023.00B')
      expect(AnyFileHelper.getFileSizeFriendly(1024)).toBe('1.00KB')
      expect(AnyFileHelper.getFileSizeFriendly(1048576)).toBe('1.00MB')
      expect(AnyFileHelper.getFileSizeFriendly(1073741824)).toBe('1.00GB')
    })

    it('应该支持自定义小数位数', () => {
      expect(AnyFileHelper.getFileSizeFriendly(1536, 0)).toBe('2KB')
      expect(AnyFileHelper.getFileSizeFriendly(1536, 1)).toBe('1.5KB')
      expect(AnyFileHelper.getFileSizeFriendly(1536, 3)).toBe('1.500KB')
    })

    it('应该处理超大文件', () => {
      expect(AnyFileHelper.getFileSizeFriendly(1e28)).toBe('LARGE FILE')
    })
  })

  describe('isImage', () => {
    it('应该正确识别图片扩展名', () => {
      expect(AnyFileHelper.isImage('jpg')).toBe(true)
      expect(AnyFileHelper.isImage('jpeg')).toBe(true)
      expect(AnyFileHelper.isImage('png')).toBe(true)
      expect(AnyFileHelper.isImage('gif')).toBe(true)
      expect(AnyFileHelper.isImage('bmp')).toBe(true)
      expect(AnyFileHelper.isImage('webp')).toBe(true)
      expect(AnyFileHelper.isImage('svg')).toBe(true)
      expect(AnyFileHelper.isImage('ico')).toBe(true)
      expect(AnyFileHelper.isImage('tiff')).toBe(true)
      expect(AnyFileHelper.isImage('tif')).toBe(true)
    })

    it('应该正确识别图片MIME类型', () => {
      expect(AnyFileHelper.isImage('image/jpeg')).toBe(true)
      expect(AnyFileHelper.isImage('image/png')).toBe(true)
      expect(AnyFileHelper.isImage('image/gif')).toBe(true)
      expect(AnyFileHelper.isImage('image/bmp')).toBe(true)
      expect(AnyFileHelper.isImage('image/webp')).toBe(true)
      expect(AnyFileHelper.isImage('image/svg+xml')).toBe(true)
      expect(AnyFileHelper.isImage('image/x-icon')).toBe(true)
      expect(AnyFileHelper.isImage('image/tiff')).toBe(true)
    })

    it('应该支持带点的扩展名', () => {
      expect(AnyFileHelper.isImage('.jpg')).toBe(true)
      expect(AnyFileHelper.isImage('.png')).toBe(true)
    })

    it('应该不区分大小写', () => {
      expect(AnyFileHelper.isImage('JPG')).toBe(true)
      expect(AnyFileHelper.isImage('JPEG')).toBe(true)
      expect(AnyFileHelper.isImage('PNG')).toBe(true)
      expect(AnyFileHelper.isImage('IMAGE/JPEG')).toBe(true)
    })

    it('应该拒绝非图片类型', () => {
      expect(AnyFileHelper.isImage('pdf')).toBe(false)
      expect(AnyFileHelper.isImage('doc')).toBe(false)
      expect(AnyFileHelper.isImage('exe')).toBe(false)
      expect(AnyFileHelper.isImage('application/pdf')).toBe(false)
    })
  })

  describe('isPdf', () => {
    it('应该正确识别PDF扩展名', () => {
      expect(AnyFileHelper.isPdf('pdf')).toBe(true)
      expect(AnyFileHelper.isPdf('.pdf')).toBe(true)
    })

    it('应该正确识别PDF MIME类型', () => {
      expect(AnyFileHelper.isPdf('application/pdf')).toBe(true)
    })

    it('应该拒绝非PDF类型', () => {
      expect(AnyFileHelper.isPdf('jpg')).toBe(false)
      expect(AnyFileHelper.isPdf('doc')).toBe(false)
      expect(AnyFileHelper.isPdf('image/jpeg')).toBe(false)
    })
  })

  describe('isExcel', () => {
    it('应该正确识别Excel扩展名', () => {
      expect(AnyFileHelper.isExcel('xls')).toBe(true)
      expect(AnyFileHelper.isExcel('xlsx')).toBe(true)
      expect(AnyFileHelper.isExcel('xlsm')).toBe(true)
      expect(AnyFileHelper.isExcel('xlsb')).toBe(true)
      expect(AnyFileHelper.isExcel('.xlsx')).toBe(true)
    })

    it('应该正确识别Excel MIME类型', () => {
      expect(AnyFileHelper.isExcel('application/vnd.ms-excel')).toBe(true)
      expect(AnyFileHelper.isExcel('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')).toBe(true)
    })

    it('应该拒绝非Excel类型', () => {
      expect(AnyFileHelper.isExcel('pdf')).toBe(false)
      expect(AnyFileHelper.isExcel('doc')).toBe(false)
      expect(AnyFileHelper.isExcel('application/pdf')).toBe(false)
    })
  })

  describe('isWord', () => {
    it('应该正确识别Word扩展名', () => {
      expect(AnyFileHelper.isWord('doc')).toBe(true)
      expect(AnyFileHelper.isWord('docx')).toBe(true)
      expect(AnyFileHelper.isWord('docm')).toBe(true)
      expect(AnyFileHelper.isWord('dot')).toBe(true)
      expect(AnyFileHelper.isWord('dotx')).toBe(true)
      expect(AnyFileHelper.isWord('.docx')).toBe(true)
    })

    it('应该正确识别Word MIME类型', () => {
      expect(AnyFileHelper.isWord('application/msword')).toBe(true)
      expect(AnyFileHelper.isWord('application/vnd.openxmlformats-officedocument.wordprocessingml.document')).toBe(true)
    })

    it('应该拒绝非Word类型', () => {
      expect(AnyFileHelper.isWord('pdf')).toBe(false)
      expect(AnyFileHelper.isWord('xls')).toBe(false)
      expect(AnyFileHelper.isWord('application/pdf')).toBe(false)
    })
  })

  describe('isUnsafeFile', () => {
    it('应该正确识别不安全文件扩展名', () => {
      expect(AnyFileHelper.isUnsafeFile('exe')).toBe(true)
      expect(AnyFileHelper.isUnsafeFile('bat')).toBe(true)
      expect(AnyFileHelper.isUnsafeFile('cmd')).toBe(true)
      expect(AnyFileHelper.isUnsafeFile('sh')).toBe(true)
      expect(AnyFileHelper.isUnsafeFile('msi')).toBe(true)
      expect(AnyFileHelper.isUnsafeFile('js')).toBe(true)
      expect(AnyFileHelper.isUnsafeFile('vbs')).toBe(true)
      expect(AnyFileHelper.isUnsafeFile('.exe')).toBe(true)
    })

    it('应该正确识别不安全文件MIME类型', () => {
      expect(AnyFileHelper.isUnsafeFile('application/x-msdownload')).toBe(true)
      expect(AnyFileHelper.isUnsafeFile('application/x-ms-installer')).toBe(true)
      expect(AnyFileHelper.isUnsafeFile('application/x-executable')).toBe(true)
      expect(AnyFileHelper.isUnsafeFile('application/octet-stream')).toBe(true)
    })

    it('应该拒绝安全文件类型', () => {
      expect(AnyFileHelper.isUnsafeFile('jpg')).toBe(false)
      expect(AnyFileHelper.isUnsafeFile('pdf')).toBe(false)
      expect(AnyFileHelper.isUnsafeFile('docx')).toBe(false)
      expect(AnyFileHelper.isUnsafeFile('image/jpeg')).toBe(false)
    })
  })

  describe('isVideo', () => {
    it('应该正确识别视频扩展名', () => {
      expect(AnyFileHelper.isVideo('mp4')).toBe(true)
      expect(AnyFileHelper.isVideo('avi')).toBe(true)
      expect(AnyFileHelper.isVideo('mov')).toBe(true)
      expect(AnyFileHelper.isVideo('wmv')).toBe(true)
      expect(AnyFileHelper.isVideo('webm')).toBe(true)
      expect(AnyFileHelper.isVideo('mkv')).toBe(true)
      expect(AnyFileHelper.isVideo('.mp4')).toBe(true)
    })

    it('应该正确识别视频MIME类型', () => {
      expect(AnyFileHelper.isVideo('video/mp4')).toBe(true)
      expect(AnyFileHelper.isVideo('video/x-msvideo')).toBe(true)
      expect(AnyFileHelper.isVideo('video/quicktime')).toBe(true)
      expect(AnyFileHelper.isVideo('video/webm')).toBe(true)
    })

    it('应该拒绝非视频类型', () => {
      expect(AnyFileHelper.isVideo('jpg')).toBe(false)
      expect(AnyFileHelper.isVideo('pdf')).toBe(false)
      expect(AnyFileHelper.isVideo('exe')).toBe(false)
      expect(AnyFileHelper.isVideo('image/jpeg')).toBe(false)
    })
  })

  describe('isServerUnsafeFile', () => {
    it('应该正确识别服务器不安全文件扩展名', () => {
      expect(AnyFileHelper.isServerUnsafeFile('php')).toBe(true)
      expect(AnyFileHelper.isServerUnsafeFile('asp')).toBe(true)
      expect(AnyFileHelper.isServerUnsafeFile('aspx')).toBe(true)
      expect(AnyFileHelper.isServerUnsafeFile('jsp')).toBe(true)
      expect(AnyFileHelper.isServerUnsafeFile('py')).toBe(true)
      expect(AnyFileHelper.isServerUnsafeFile('rb')).toBe(true)
      expect(AnyFileHelper.isServerUnsafeFile('htaccess')).toBe(true)
      expect(AnyFileHelper.isServerUnsafeFile('config')).toBe(true)
      expect(AnyFileHelper.isServerUnsafeFile('.php')).toBe(true)
    })

    it('应该正确识别服务器不安全文件MIME类型', () => {
      expect(AnyFileHelper.isServerUnsafeFile('application/x-httpd-php')).toBe(true)
      expect(AnyFileHelper.isServerUnsafeFile('application/x-asp')).toBe(true)
      expect(AnyFileHelper.isServerUnsafeFile('text/x-php')).toBe(true)
    })

    it('应该拒绝服务器安全文件类型', () => {
      expect(AnyFileHelper.isServerUnsafeFile('jpg')).toBe(false)
      expect(AnyFileHelper.isServerUnsafeFile('pdf')).toBe(false)
      expect(AnyFileHelper.isServerUnsafeFile('docx')).toBe(false)
      expect(AnyFileHelper.isServerUnsafeFile('image/jpeg')).toBe(false)
    })
  })

  describe('边界情况处理', () => {
    it('应该处理空字符串', () => {
      expect(AnyFileHelper.isImage('')).toBe(false)
      expect(AnyFileHelper.isPdf('')).toBe(false)
      expect(AnyFileHelper.isExcel('')).toBe(false)
    })

    it('应该处理null和undefined', () => {
      // @ts-expect-error - 测试边界情况
      expect(AnyFileHelper.isImage(null)).toBe(false)
      // @ts-expect-error - 测试边界情况
      expect(AnyFileHelper.isImage(undefined)).toBe(false)
    })

    it('应该处理带空格的情况', () => {
      expect(AnyFileHelper.isImage(' jpg ')).toBe(true)
      expect(AnyFileHelper.isImage(' image/jpeg ')).toBe(true)
    })
  })
})
