import { Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { PrimeNG } from 'primeng/config';
import { FileSelectEvent } from 'primeng/fileupload';
import { FileExtended } from 'src/app/_shared/models';
import { FileUtils, ObjectUtils } from 'src/app/_shared/utils';

@Component({
  selector: 'app-file-selector',
  standalone: false,
  templateUrl: './file-selector.component.html',
  styleUrl: './file-selector.component.scss'
})
export class FileSelectorComponent implements OnInit, OnDestroy {

  @Input() buttonLabel: string = 'Choose file';
  @Input() iconClass: string = 'pi pi-upload'
  @Input() autoDispose: boolean = true;
  @Input() attachedFiles: FileExtended[] = [];
  @Input() maxFileSizeBytes: number = 1000000;
  @Input() allowedFormats: string = ".doc,.docx,.xlsx,.pdf,.ppt,.pptx,.csv,.xls,.xlsx,.png,.jpg,.jpeg,.gif,.svg,.tiff,.bmp,.mp4,.mp3,.mkv,.wav,.wma,.wmv,.webm,.mpeg,.mov,.avi,.7z,.zip,.rar,.json,.xml,.txt,.rtf,.log";
  @Output() attachedFilesChange: EventEmitter<FileExtended[]> = new EventEmitter<FileExtended[]>();

  isError: boolean = false;

  private config = inject(PrimeNG);

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    if (this.autoDispose)
      this.revokeObjectUrls();
  }

  onFileSelection(event: FileSelectEvent): void {
    this.isError = false;

    const selectedFiles: File[] = Array.from(event.files);

    if (!this.validateUpload(selectedFiles)) {
      this.isError = true;
      return;
    }


    selectedFiles.forEach(file => {
      const extendedFile: FileExtended = file;
      extendedFile.objectUrl = URL.createObjectURL(file);

      this.attachedFiles.push(extendedFile);
    });
  }

  openFile(file: FileExtended): void {
    window.open(file.objectUrl, '_blank');
  }

  removeAttachedFile(file: FileExtended): void {
    URL.revokeObjectURL(file.objectUrl);
    this.attachedFiles = this.attachedFiles.filter(f => f !== file);
  }

  formatSize(bytes): string {
    return FileUtils.formatFileSize(bytes, this.config);
  }

  getFileThumbnailUrl(file: FileExtended): string {
    if (FileUtils.isImage(file.name))
      return file.objectUrl;

    const thumbnailPath: string = FileUtils.getFileThumbnailUrl(file.name);
    return thumbnailPath;
  }

  private validateUpload(newFiles: File[]): boolean {
    let totalSize: number = 0;

    if (ObjectUtils.hasData(this.attachedFiles)) {
      totalSize += this.attachedFiles.reduce((acc, file) => acc + file.size, 0);
    }

    totalSize += newFiles.reduce((acc, file) => acc + file.size, 0);

    return totalSize <= this.maxFileSizeBytes;
  }

  private revokeObjectUrls(): void {
    if (ObjectUtils.isEmpty(this.attachedFiles))
      return;

    const objectUrls: string[] = this.attachedFiles.map(f => f.objectUrl);

    objectUrls.forEach(url => {
      URL.revokeObjectURL(url);
    });
  }
}
