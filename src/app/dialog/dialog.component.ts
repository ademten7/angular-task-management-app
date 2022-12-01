import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  priorities: string[] = ['Hoch', 'Mittel', 'Niedrig'];
  status: string[] = ['Neu', 'In Bearbeitung', 'Abgeschlossen'];
  taskForm!: FormGroup;
  actionBtn: string = 'Speichern';
  dialogTitle: string = 'Neue Aufgabe Hinzufügen';

  constructor(
    private formBuilder: FormBuilder,
    private api: TaskService,
    @Inject(MAT_DIALOG_DATA) public editData: any, // to inject data for editTask()
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['', Validators.required],
      status: ['', Validators.required],
      published_time: Date.now(),
    });

    // console.log(this.editData);
    //to set the data on the dialog form
    if (this.editData) {
      this.actionBtn = 'Aktualisierung';
      this.dialogTitle = 'Aktualisieren der Aufgabe';

      this.taskForm.controls['title'].setValue(this.editData.title);
      this.taskForm.controls['description'].setValue(this.editData.description);
      this.taskForm.controls['priority'].setValue(this.editData.priority);
      this.taskForm.controls['status'].setValue(this.editData.status);
    }
  }

  addTask(): void {
    //console.log(this.taskForm.value);
    if (!this.editData) {
      if (this.taskForm.valid) {
        this.api.postTask(this.taskForm.value).subscribe({
          next: (res) => {
            //alert('Neue Aufgabe wurde erfolgreich hinzugefügt');

            this.dialogRef.close('save');
          },
          error: () => {
            alert('Fehler beim Hinzufügen der Aufgabe');
          },
        });
      }
    } else {
      this.updateTask();
    }
  }

  updateTask(): void {
    this.api.putTask(this.taskForm.value, this.editData.id).subscribe({
      next: (res) => {
        // console.log(res);

        this.dialogRef.close('update');
      },
      error: () => {
        alert('Error while updating the product');
      },
    });
  }
}
