import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-material-file-uploader',
  templateUrl: './material-file-uploader.component.html',
  styleUrls: ['./material-file-uploader.component.css']
})
export class MaterialFileUploaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  requiredFileType!: string;

  fileName = '';
  uploadProgress!: number;
  uploadSub!: Subscription;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("thumbnail", file);

      
    }
  }

  cancelUpload() {
    this.uploadSub.unsubscribe();
  }

}
