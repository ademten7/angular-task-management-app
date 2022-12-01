import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DialogComponent } from '../dialog/dialog.component';
import { TaskData } from '../interfaces/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  priorities: string[] = ['Hoch', 'Mittel', 'Niedrig'];
  status: string[] = ['Neu', 'In Bearbeitung', 'Abgeschlossen'];
  taskList: any[] = [];
  filteredTitle: string = '';
  filteredPriority: string = '';
  filteredStatus: string = '';
  searchTitle: string = '';
  searchPriority: string = '';
  searchStatus: string = '';

  constructor(private api: TaskService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllTaskList();
    // console.log(this.taskList);
  }
  openDialog(): void {
    this.dialog
      .open(DialogComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((val) => {
        //to get data without refresh the page
        if (val === 'save') {
          this.getAllTaskList();
        }
      });
  }
  getAllTaskList(): void {
    this.api.getTasks().subscribe({
      next: (res) => {
        // console.log(res);
        if (res && res.length > 0) {
          this.taskList = res;
          //to put new task on the top of the list
          this.taskList.sort((a, b) => b.published_time - a.published_time);
        }
      },
      error: () => {
        alert('Fehler beim Abruf von Aufgaben!!!');
      },
    });
  }

  editTask(task: TaskData): void {
    this.dialog
      .open(DialogComponent, {
        width: '30%',
        data: task,
      })
      .afterClosed()
      .subscribe((val) => {
        //to edit data without refresh the page
        if (val === 'update') {
          this.getAllTaskList();
        }
      });
  }

  deleteTask(id: number): void {
    this.api.deleteTask(id.toString()).subscribe({
      next: (res) => {
        //alert('Die Aufgabe wurde gelöscht');
        this.getAllTaskList();
      },
      error: () => {
        //alert('Fehler beim Löschen der Aufgabe');
      },
    });
  }

  //drag-drop method
  drop(event: CdkDragDrop<Object[]>) {
    moveItemInArray(this.taskList, event.previousIndex, event.currentIndex);
  }

  onTaskFilter(): void {
    this.searchTitle = this.filteredTitle;
    this.searchPriority = this.filteredPriority;
    this.searchStatus = this.filteredStatus;
  }

  onTaskFilterClear(): void {
    this.searchTitle = '';
    this.searchPriority = '';
    this.searchStatus = '';
    this.filteredTitle = '';
    this.filteredPriority = '';
    this.filteredStatus = '';
  }
}
