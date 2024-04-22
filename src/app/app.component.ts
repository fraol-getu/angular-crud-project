import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from './add/add.component';
import { EmployeService } from './service/employe.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { error } from 'console';
import { EditComponent } from './edit/edit.component';
import { CoreService } from './core/core.service';

interface Employee {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  dob: Date; // Or string depending on your data format
  gender: string;
  educatiomlevel: string;
  companyname: string;
  experiance: number;
  salary: number;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})


export class AppComponent implements OnInit {
  title ="crud app"

  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'email', 'dob', 'gender', 'educationlevel', 'companyname',
    'experiance', 'salary', 'action'
  ];
  dataSource!: MatTableDataSource<Employee>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  constructor(private dialog: MatDialog, private getempservi: EmployeService, private coreservice: CoreService) {}
openAdd() {
   const dialogref = this.dialog.open(AddComponent)
   dialogref.afterClosed().subscribe({
    next : (val) => {
      if(val) {
        this.getEmployList()
      }
    }
   })
}


ngOnInit(): void {
    this.getEmployList()
}

 getEmployList(){
  this.getempservi.getEmploye().subscribe({
    next  :(res : any) => {

      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator
  },
  error : (err) => {
    console.log(err)
  }
  })
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
}


}

deleteEmployList(id : number) {
  const confirmation = window.confirm("Are you sure you want to delete this employee?"); // Use clear and concise language
 if (confirmation) {
  this.getempservi.deleteEmploye(id).subscribe({
    next : (res: any) => {
      const confrim = window.confirm("are you sure")
      if (confrim){
      this.coreservice.openSnackbar("data updated sucessfully")
      this.getEmployList()
    }
    },

    error : (err) => {
      console.log(err)
    }

  })
 }


}

openEdit(data: any) {
 const dialog = this.dialog.open(AddComponent, {
    data : data})
dialog.afterClosed().subscribe(
  {
    next : (val) => {
      if(val) {
        this.getEmployList()
      }
    }
  }
)
}



}
