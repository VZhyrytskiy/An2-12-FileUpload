import { Component } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedFile: File = null;
  uploadProgress = '';

  constructor(private http: HttpClient) {}

  onSelectFile(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload() {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);

    this.http
      .post('http://localhost:3000/upload', fd, {
        reportProgress: true,
        observe: 'events'
      })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          // UploadProgress Event
          this.uploadProgress = `Upload progress: ${Math.round(
            event.loaded / event.total * 100
          )}%`;
          console.log(this.uploadProgress);
        } else if (event.type === HttpEventType.Response) {
          // Reponse Event
          console.log(event);
        }
      });
  }
}
