import { Component, EventEmitter, inject, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { PrimeNG } from 'primeng/config';
import { FileSelectEvent } from 'primeng/fileupload';
import { FileExtended } from 'src/app/_shared/models';
import { FileUtils, ObjectUtils } from 'src/app/_shared/utils';

@Component({
  selector: 'app-image-selector',
  standalone: false,
  templateUrl: './image-selector.component.html',
  styleUrl: './image-selector.component.scss'
})
export class ImageSelectorComponent implements OnInit, OnChanges, OnDestroy {
  readonly defaultBlankImgPath: string = 'assets/images/no_img.png';
  readonly maxFileSizeBytes: number = 26214400; // 25 mb

  @Input() src: string;
  @Input() autoDispose: boolean = true;
  @Input() imageHeight: string = '150px';
  @Input() backgroundColor: string;
  @Input() buttonClass: string = 'btn-outline-secondary';
  @Input() file: FileExtended;
  @Output() fileChange: EventEmitter<FileExtended> = new EventEmitter<FileExtended>();
  @Output() fileCleared: EventEmitter<void> = new EventEmitter<void>();

  isUploadError: boolean = false;
  isEditing: boolean = false;
  isSubmitted: boolean = false;

  private config = inject(PrimeNG);

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (ObjectUtils.isEmpty(this.src))
      this.src = this.defaultBlankImgPath;

    if (this.autoDispose && ObjectUtils.hasData(this.file)) {
      this.file.objectUrl = URL.createObjectURL(this.file);
      this.src = this.file.objectUrl;
    }
  }

  ngOnDestroy(): void {
    if (this.autoDispose)
      this.revokeObjectUrl();
  }

  hasUploaded(): boolean {
    return this.src !== this.defaultBlankImgPath && ObjectUtils.hasData(this.src);
  }

  clearUpload(): void {
    this.revokeObjectUrl();
    this.file = null;
    this.src = this.defaultBlankImgPath;
    this.fileCleared.emit();
  }

  onFileSelection(event: FileSelectEvent): void {
    this.isUploadError = false;

    const selectedFiles: File[] = Array.from(event.files);

    if (!this.validateUpload(selectedFiles[0])) {
      this.isUploadError = true;
      return;
    }

    const extendedFile: FileExtended = selectedFiles[0];
    extendedFile.objectUrl = URL.createObjectURL(selectedFiles[0]);
    this.file = selectedFiles[0];
    this.src = this.file.objectUrl;

    this.fileChange.emit(this.file);
  }

  formatSize(bytes): string {
    return FileUtils.formatFileSize(bytes, this.config);
  }

  private validateUpload(newFile: File): boolean {
    return newFile.size <= this.maxFileSizeBytes;
  }

  private revokeObjectUrl(): void {
    if (ObjectUtils.isEmpty(this.file))
      return;

    URL.revokeObjectURL(this.file.objectUrl);
  }
}
