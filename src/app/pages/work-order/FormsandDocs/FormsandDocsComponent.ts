import { Component, OnInit } from "@angular/core";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsandDocsService } from './FormsandDocsService';

@Component({
  templateUrl: "./FormsandDocsView.html"
})
export class FormsandDocsComponent implements OnInit {
  fileList = [];
  folderNames = [];
  objectKeys = Object.keys;
  newFolderName = '';
  changeFolderName = '';

  constructor(
    private modalService: NgbModal,
    private uploadService: FormsandDocsService
  ) {}

  ngOnInit() {
    this.uploadService.getFolders()
    .subscribe(res => {
      this.fileList = res;
    });

    this.uploadService.getFolderNames()
    .subscribe(res => {
      this.folderNames = res;
      this.folderNames.sort()
    });
  }

  openUploadDialog(dialog: any) {
    this.modalService
      .open(dialog, { size: "sm", ariaLabelledBy: "modal-basic-title" });
  }

  filteredFiles(folderName) {
    return this.fileList.filter(file => file.folder === folderName)
  }

  uploadDocument(documentInput: any) {
    this.uploadService
    .uploadDocument(documentInput.target.files[0])
    .then((res) => {
      res.subscribe(response => {
        this.fileList.push({
          name: documentInput.target.files[0].name,
          path: response.savedUrl,
          folder: '-----',
          id: response.id
        })
      });
    })
  }

  saveFolder() {
    this.folderNames.push(this.newFolderName);
    this.folderNames.sort();
    this.uploadService.addFolderName(this.newFolderName)
    .subscribe(res => {
      this.newFolderName = '';
    })
  }

  changeFolder(document) {
    this.fileList.map(file => {
      if (file.id === document.id) {
        file.folder = this.changeFolderName;
      }
    });
    this.uploadService.changeFolder(document, this.changeFolderName)
    .subscribe(res => {
      this.changeFolderName = '';
    })
  }

  deleteDocument(fileName: any) {
    this.uploadService
    .deleteDocument(fileName)
    .subscribe(() => {
      this.fileList = this.fileList.filter(file => file.name !== fileName);
    })
  }
}
