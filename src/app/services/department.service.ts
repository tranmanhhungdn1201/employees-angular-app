import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  departmentList: AngularFireList<any>;
  array:any = [];

  constructor(private firebase: AngularFireDatabase) {
    this.departmentList = this.firebase.list('departments');
    this.departmentList.snapshotChanges().subscribe(list => {
      this.array = list.map(item => {
        return {
          $key: item.key,
          ...item.payload.val()
        }
      })
    })
  }

  getDepartmentName($key:string) {
    if ($key == "0") {
      return "";
    } else {
      return this.array.find((dep:any) => dep.$key == $key)['value'];
    }
  }
}
