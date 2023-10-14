import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FormsandDocsService {

  constructor(
    private _http: HttpClient
  ) { }

  readDoc(file: any) {
    const fr = new FileReader();
    return new Promise((resolve, reject) => {
      fr.onerror = (err) => {
        reject(err);
      }

      fr.onloadend = () => {
        resolve(fr.result);
      }

      fr.readAsDataURL(file);
    });
  }

  async uploadDocument(file: any) {
    const uploadapi = 'https://us-central1-rare-lambda-245821.cloudfunctions.net/app/uploadDocument';
    // const uploadapi = 'http://localhost:5000/uploadDocument';
    const request = {
      document_name: file.name,
      document: null
    }
    const doc = await this.readDoc(file);
    request.document = doc;
    return this._http.post<any>(uploadapi, request).pipe(
      tap(data => {
        return data;
      })
    );
  }

  changeFolder(document, newFolderName) {
    const uploadapi = 'https://us-central1-rare-lambda-245821.cloudfunctions.net/app/moveDirectory';
    // const uploadapi = 'http://localhost:5000/moveDirectory';
    const request = {
      document,
      newFolderName
    }
    return this._http.post<any>(uploadapi, request).pipe(
      tap(data => {
        // console.log(data);
      })
    )
  }

  getFolderNames() {
    const uploadapi = 'https://us-central1-rare-lambda-245821.cloudfunctions.net/app/getFolderNames';
    // const uploadapi = 'http://localhost:5000/getFolderNames';
    return this._http.post<any>(uploadapi, {}).pipe(
      tap(data => {
        return data;
      })
    );
  }

  addFolderName(folderName) {
    const uploadapi = 'https://us-central1-rare-lambda-245821.cloudfunctions.net/app/addFolderName';
    // const uploadapi = 'http://localhost:5000/addFolderName';
    return this._http.post<any>(uploadapi, {folderName: folderName}).pipe(
      tap(data => {
        return data;
      })
    );
  }

  async uploadDocumentWithFolder(file: any, folder: string) {
    const uploadapi = 'https://us-central1-rare-lambda-245821.cloudfunctions.net/app/uploadDocumentWithFolder';
    // const uploadapi = 'http://localhost:5000/uploadDocumentWithFolder';
    const request = {
      document_name: file.name,
      document: null,
      directory_name: folder,
    }
    const doc = await this.readDoc(file);
    request.document = doc;
    return this._http.post<any>(uploadapi, request).pipe(
      tap(data => {
        return data;
      })
    );
  }

  getDocumentsList() {
    const uploadapi = 'https://us-central1-rare-lambda-245821.cloudfunctions.net/app/getAllDocuments';
    // const uploadapi = 'http://localhost:5000/getAllDocuments';
    return this._http.post<any>(uploadapi, {}).pipe(
      tap(data => {
        return data;
      })
    );
  }

  getFolders() {
    const uploadapi = 'https://us-central1-rare-lambda-245821.cloudfunctions.net/app/getAllFolders';
    // const uploadapi = 'http://localhost:5000/getAllFolders';
    return this._http.post<any>(uploadapi, {}).pipe(
      tap(data => {
        return data;
      })
    );
  }

  deleteDocument(fileName: any) {
    const uploadapi = 'https://us-central1-rare-lambda-245821.cloudfunctions.net/app/deleteDocument';
    // const uploadapi = 'http://localhost:5000/deleteDocument';
    return this._http.post<any>(uploadapi, {document_name: fileName}).pipe(
      tap(data => {
        return data;
      })
    );
  }
}
