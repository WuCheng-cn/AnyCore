/** # 文件助手类 */
export abstract class AnyFileHelper {
  // 图片类型常量 📷
  private static readonly IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg', 'ico', 'tiff', 'tif']
  private static readonly IMAGE_MIMES = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp', 'image/svg+xml', 'image/x-icon', 'image/tiff']

  // PDF类型常量 📄
  private static readonly PDF_EXTENSIONS = ['pdf']
  private static readonly PDF_MIMES = ['application/pdf']

  // Excel类型常量 📊
  private static readonly EXCEL_EXTENSIONS = ['xls', 'xlsx', 'xlsm', 'xlsb']
  private static readonly EXCEL_MIMES = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel.sheet.macroEnabled.12', 'application/vnd.ms-excel.sheet.binary.macroEnabled.12']

  // Word类型常量 📝
  private static readonly WORD_EXTENSIONS = ['doc', 'docx', 'docm', 'dot', 'dotx']
  private static readonly WORD_MIMES = ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-word.document.macroEnabled.12', 'application/vnd.ms-word.template.macroEnabled.12']

  // 不安全文件类型常量 ⚠️
  private static readonly UNSAFE_EXTENSIONS = ['exe', 'bat', 'cmd', 'sh', 'bin', 'app', 'dmg', 'msi', 'com', 'scr', 'pif', 'application', 'gadget', 'msp', 'mst', 'msc', 'jar', 'vb', 'vbs', 'vbe', 'js', 'jse', 'ws', 'wsf', 'wsc', 'wsh', 'ps1', 'ps1xml', 'ps2', 'ps2xml', 'psc1', 'psc2', 'msh', 'msh1', 'msh2', 'mshxml', 'msh1xml', 'msh2xml', 'scf', 'lnk', 'inf', 'reg', 'cpl', 'msc', 'msp', 'hta', 'msp', 'mst', 'ade', 'adp', 'bas', 'chm', 'crt', 'cpl', 'hlp', 'hta', 'inf', 'ins', 'isp', 'jse', 'lnk', 'mdb', 'mde', 'mdt', 'mdw', 'mdz', 'msc', 'msi', 'msp', 'mst', 'ops', 'pcd', 'pif', 'prf', 'reg', 'scf', 'scr', 'sct', 'shb', 'shs', 'url', 'vb', 'vbe', 'vbs', 'wsc', 'wsf', 'wsh']
  private static readonly UNSAFE_MIMES = ['application/x-msdownload', 'application/x-ms-installer', 'application/x-executable', 'application/x-sh', 'application/x-shellscript', 'application/x-dosexec', 'application/x-msdos-program', 'application/octet-stream']

  // 视频类型常量 🎥
  private static readonly VIDEO_EXTENSIONS = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm', 'mkv', 'm4v', '3gp', '3g2', 'mpeg', 'mpg', 'mpe', 'mpv', 'ogg', 'ogv', 'qt', 'mxf', 'mts', 'm2ts', 'ts', 'vob', 'asf', 'rm', 'rmvb', 'divx', 'xvid']
  private static readonly VIDEO_MIMES = ['video/mp4', 'video/x-msvideo', 'video/quicktime', 'video/x-ms-wmv', 'video/x-flv', 'video/webm', 'video/x-matroska', 'video/3gpp', 'video/3gpp2', 'video/mpeg', 'video/ogg', 'video/x-ms-asf']

  // 服务器不安全文件类型常量 🚫
  private static readonly SERVER_UNSAFE_EXTENSIONS = ['php', 'asp', 'aspx', 'jsp', 'jspx', 'cfm', 'cfml', 'pl', 'py', 'rb', 'rhtml', 'shtml', 'phtml', 'htaccess', 'htpasswd', 'config', 'ini', 'log', 'sql', 'db', 'mdb', 'accdb', 'bak', 'tmp', 'temp', 'swp', 'swo']
  private static readonly SERVER_UNSAFE_MIMES = ['application/x-httpd-php', 'application/x-asp', 'application/x-aspx', 'text/x-php', 'text/x-asp', 'text/x-jsp', 'application/x-jsp']

  /**
   * # 字节数转可读文件大小
   * @param size 字节数
   * @param fractionDigits 小数位数
   */
  static getFileSizeFriendly(size: number, fractionDigits = 2): string {
    const partSize = 1024
    const unitArr = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    let res = ''
    for (let i = 0; i < unitArr.length; i += 1) {
      if (size < partSize ** (i + 1)) {
        res = `${(size / partSize ** i).toFixed(fractionDigits)}${unitArr[i]}`
        break
      }
      res = 'LARGE FILE'
    }
    return res
  }

  /**
   * # 判断是否为图片类型 📷
   * @param type 文件后缀或MIME类型
   */
  static isImage(type: string): boolean {
    return this.checkType(type, this.IMAGE_EXTENSIONS, this.IMAGE_MIMES)
  }

  /**
   * # 判断是否为PDF类型 📄
   * @param type 文件后缀或MIME类型
   */
  static isPdf(type: string): boolean {
    return this.checkType(type, this.PDF_EXTENSIONS, this.PDF_MIMES)
  }

  /**
   * # 判断是否为Excel类型 📊
   * @param type 文件后缀或MIME类型
   */
  static isExcel(type: string): boolean {
    return this.checkType(type, this.EXCEL_EXTENSIONS, this.EXCEL_MIMES)
  }

  /**
   * # 判断是否为Word类型 📝
   * @param type 文件后缀或MIME类型
   */
  static isWord(type: string): boolean {
    return this.checkType(type, this.WORD_EXTENSIONS, this.WORD_MIMES)
  }

  /**
   * # 判断是否为不安全文件类型 ⚠️
   * @param type 文件后缀或MIME类型
   */
  static isUnsafeFile(type: string): boolean {
    return this.checkType(type, this.UNSAFE_EXTENSIONS, this.UNSAFE_MIMES)
  }

  /**
   * # 判断是否为视频类型 🎥
   * @param type 文件后缀或MIME类型
   */
  static isVideo(type: string): boolean {
    return this.checkType(type, this.VIDEO_EXTENSIONS, this.VIDEO_MIMES)
  }

  /**
   * # 判断是否为服务器不安全文件类型 🚫
   * @param type 文件后缀或MIME类型
   */
  static isServerUnsafeFile(type: string): boolean {
    return this.checkType(type, this.SERVER_UNSAFE_EXTENSIONS, this.SERVER_UNSAFE_MIMES)
  }

  /**
   * # 检查类型匹配 🔍
   * @param type 输入的类型
   * @param extensions 扩展名数组
   * @param mimes MIME类型数组
   */
  private static checkType(type: string, extensions: string[], mimes: string[]): boolean {
    if (!type)
      return false

    const normalizedType = type.toLowerCase().trim()

    // 检查扩展名
    if (extensions.some(ext => normalizedType === ext || normalizedType.endsWith(`.${ext}`))) {
      return true
    }

    // 检查MIME类型
    if (mimes.includes(normalizedType)) {
      return true
    }

    return false
  }
}
