import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PrimeIcons} from "primeng/api";
import {FilesHttpService} from "@services/core";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  @Input() acceptAttributes = '.pdf,.txt,.doc,.docx,.xls,.xlsx,.csv,.ppt,.pptx,.zip,.rar,.7z,.tar, image/*';
  @Input() multiple = true;
  @Input() maxFileSize = 10240000 * 20;
  @Input() fileLimit = 20;
  @Input() mode = 'basic';
  @Input() modelId: string = '';
  @Output() flagUploadFiles: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  protected readonly PrimeIcons = PrimeIcons;

  constructor(private filesHttpService: FilesHttpService) {
  }

  uploadFile(event: any, uploadFiles: any) {
    const formData = new FormData();
    formData.append('file', event.files[0]);
    this.filesHttpService.uploadFile(this.modelId, formData).subscribe(response => {
      this.flagUploadFiles.emit(true);
      uploadFiles.clear();
    }, error => uploadFiles.clear());
  }

  uploadFiles(event: any, uploadFiles: any) {
    const formData = new FormData();
    formData.append('files[]', event.files);

    this.filesHttpService.uploadFiles(this.modelId, formData).subscribe(response => {
      this.flagUploadFiles.emit(false);
      uploadFiles.clear();
    });
  }
}
