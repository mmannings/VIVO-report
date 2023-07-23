import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-material-file-uploader',
  templateUrl: './material-file-uploader.component.html',
  styleUrls: ['./material-file-uploader.component.css']
})
export class MaterialFileUploaderComponent {
  @Output() fileSelected = new EventEmitter<File>();
  @Output() fileDropped = new EventEmitter<File>();

  uploadedFile: File | null = null;

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      const file: File = files[0];
      this.fileSelected.emit(file);
      this.uploadedFile = file;
    }
  }

  onFileDropped(files: FileList) {
    if (files && files.length > 0) {
      const file: File = files[0];
      this.fileDropped.emit(file);
      this.uploadedFile = file;
    }
  }

  cancelUpload() {
    this.uploadedFile = null;
  }
}
