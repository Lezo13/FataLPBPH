import { PrimeNG } from "primeng/config";

export class FileUtils {
  static getFileThumbnailUrl(fileName: string): string {
    const extension: string = this.getFileExtension(fileName)?.toLowerCase();

    let thumbnailPath: string = '';

    switch (extension) {
      case "jpeg":
      case "jpg":
      case "png":
      case "gif":
        thumbnailPath = "system/defaultImage.png";
        break;
      case "mp4":
      case "avi":
      case "mpeg":
      case "webm":
      case "wmv":
      case "mov":
      case "mkv":
        thumbnailPath = "system/defaultVideo.png";
        break;
      case "wma":
      case "mp3":
        thumbnailPath = "system/defaultSound.png";
        break;
      case "pdf":
        thumbnailPath = "system/defaultPDF.png";
        break;
      case "doc":
      case "docx":
        thumbnailPath = "system/defaultWord.png";
        break;
      case "csv":
      case "xls":
      case "xlsx":
        thumbnailPath = "system/defaultExcel.png";
        break;
      case "ppt":
      case "pptx":
        thumbnailPath = "system/defaultPowerPoint.png";
        break;
      default:
        thumbnailPath = "system/defaultUnknown.png";
        break;
    }

    const fullPath: string = `assets/images/${thumbnailPath}`;
    return fullPath;
  }

  static isImage(fileName: string): boolean {
    const extension: string = this.getFileExtension(fileName)?.toLowerCase();
    let result: boolean = false;

    switch (extension) {
      case "jpeg":
      case "jpg":
      case "png":
      case "gif":
        result = true;
        break;
    }

    return result;
  }

  static getFileExtension(fileName: string): string {
    const lastDotIndex = fileName.lastIndexOf('.');
    return lastDotIndex > 0 ? fileName.substring(lastDotIndex + 1) : '';
  }

  static formatFileSize(bytes: number, config: PrimeNG): string {
    const k = 1024;
    const dm = 3;
    const sizes = config.translation.fileSizeTypes;
    if (bytes === 0) {
      return `0 ${sizes[0]}`;
    }

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    return `${formattedSize} ${sizes[i]}`;
  }
}
