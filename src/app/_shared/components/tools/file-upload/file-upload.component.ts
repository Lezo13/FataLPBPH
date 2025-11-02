import { Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { PrimeNG } from 'primeng/config';
import { FileSelectEvent } from 'primeng/fileupload';
import { FileExtended } from 'src/app/_shared/models';
import { FileUtils, ObjectUtils } from 'src/app/_shared/utils';

@Component({
  selector: 'app-file-upload',
  standalone: false,
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent implements OnInit, OnDestroy {

  @Input() buttonLabel: string = 'Choose file';
  @Input() iconClass: string = 'pi pi-upload'
  @Input() autoDispose: boolean = true;
  @Input() uploadedFile: FileExtended;
  @Input() maxFileSizeBytes: number = 2147483648;
  @Input() allowedFormats: string = ".doc,.docx,.xlsx,.pdf,.ppt,.pptx,.csv,.xls,.xlsx,.png,.jpg,.jpeg,.gif,.svg,.tiff,.bmp,.mp4,.mp3,.mkv,.wav,.wma,.wmv,.webm,.mpeg,.mov,.avi,.7z,.zip,.rar,.json,.xml,.txt,.rtf,.log";
  @Output() uploadedFileChange: EventEmitter<FileExtended> = new EventEmitter<FileExtended>();

  isError: boolean = false;

  private config = inject(PrimeNG);

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    if (this.autoDispose)
      this.revokeObjectUrl();
  }

  onFileSelection(event: FileSelectEvent): void {
    this.isError = false;

    const selectedFile: File = event.files[0];


    if (!this.validateUpload(selectedFile)) {
      this.isError = true;
      return;
    }

    const extendedFile: FileExtended = selectedFile;
    extendedFile.objectUrl = URL.createObjectURL(selectedFile);

    this.uploadedFile = extendedFile;
    this.uploadedFileChange.emit(this.uploadedFile);
  }

  openFile(file: FileExtended): void {
    window.open(file.objectUrl, '_blank');
  }

  removeAttachedFile(file: FileExtended): void {
    URL.revokeObjectURL(file.objectUrl);
    this.uploadedFile = null;
    this.uploadedFileChange.emit(this.uploadedFile);
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

  private validateUpload(newFile: File): boolean {
    return newFile.size <= this.maxFileSizeBytes;
  }

  private revokeObjectUrl(): void {
    if (ObjectUtils.isEmpty(this.uploadedFile))
      return;

    URL.revokeObjectURL(this.uploadedFile.objectUrl);
  }
}
