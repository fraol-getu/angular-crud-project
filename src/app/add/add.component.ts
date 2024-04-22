import { Component,  Inject,  OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeService } from '../service/employe.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent implements OnInit{
  addForm: FormGroup

  education: string[] = [
  'Matric',
  'Deploma',
  'Degree',
  'Masters',
]
constructor(private fb : FormBuilder, private empservice: EmployeService, private degref: MatDialogRef<AddComponent>, @Inject(MAT_DIALOG_DATA) public data : any ,
 private coreservice: CoreService
) {
  this.addForm = fb.group({
   firstname: "",
    lastname:"",
    email: "",
    dob: "",
    gender:"",
    educationlevel:"",
    companyname:"",
    experiance:"",
    salary: "",
})
}

ngOnInit(): void {
  this.addForm.patchValue(this.data);
}
onformSubmit() {
  if (this.addForm.valid){
    if (this.data) {
      this.empservice
        .editEmployee(this.data.id, this.addForm.value)
        .subscribe({
          next: (val: any) => {
          this.coreservice.openSnackbar("data updated sucessfully")
            this.degref.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        }) }
        else {

    this.empservice.addEmployee(this.addForm.value).subscribe({
      next:(val: any) => {
        this.coreservice.openSnackbar("data updated sucessfully")
        this.degref.close(true)
      },
      error: (err) => {
      console.log(err)
      }
    })
  }
  }
}


}
