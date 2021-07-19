import { Component, OnInit, ViewChild} from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee/employee';
import { MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DepartmentService } from 'src/app/services/department.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EmployeeComponent } from 'src/app/components/employees/employee/employee.component';
import { NotificationService } from 'src/app/services/notification.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  listData: MatTableDataSource<Employee>;
  displayedColumns: string[] = ['fullName', 'email', 'mobile', 'city', 'departmentName', 'actions'];
  lengthData = 0;
  searchKey: string = "";
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(list => {
      let arr = list.map(emp => {
        let departmentName = this.departmentService.getDepartmentName(emp.payload.val()['department']);
        return {
          $key: emp.key,
          departmentName,
          ...emp.payload.val()
        }
      });
      this.listData = new MatTableDataSource(arr);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
      this.lengthData = this.listData.data.length;
    });
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLocaleLowerCase();
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(EmployeeComponent, dialogConfig);
  }

  onEdit(row:any) {
    let empTemp = {...row};
    delete empTemp.departmentName;
    this.employeeService.populateForm(empTemp);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(EmployeeComponent, dialogConfig);
  }

  onDelete(row:any) {
    this.dialogService.openConfirmDialog('Are you sure to delete this record?')
    .afterClosed().subscribe(res => {
      if (res) {
        this.employeeService.deleteEmployee(row.$key);
        this.notificationService.warn('! Deleted successfully');
      }
    })
  }
}
