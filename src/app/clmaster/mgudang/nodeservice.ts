import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { TreeNode } from 'primeng/api';

@Injectable()
export class NodeService {
  constructor(private http: HttpClient) {}

  getFiles() {
    return this.http
      .get<any>('assets/tesjson.json')
      .toPromise()
      .then((res) => <TreeNode[]>res);
  }

 
}
