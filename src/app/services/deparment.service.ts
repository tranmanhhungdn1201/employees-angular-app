import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class DeparmentService {
  departmentList: AngularFireList<any>;
  array:any = [];

  constructor(private firebase: AngularFireDatabase) {
    this.departmentList = this.firebase.list('departments');
    this.departmentList.snapshotChanges().subscribe(list => {
      this.array = list.map(item => {
        return {
          ...item.payload.val()
        }
      })
    })
  }
}
