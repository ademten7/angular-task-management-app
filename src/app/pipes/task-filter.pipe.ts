import { Pipe, PipeTransform } from '@angular/core';
import { TaskData } from '../interfaces/task';

@Pipe({
  name: 'taskFilter',
})
export class TaskFilterPipe implements PipeTransform {
  transform(taskList: TaskData[], ...args: string[]): TaskData[] {
    let [filteredTitle, filteredPriority, filteredStatus] = [...args];

    // console.log(filteredTitle);
    // console.log(filteredPriority);
    // console.log(filteredStatus);

    if (taskList.length === 0) {
      return taskList;
    }

    if (filteredTitle) {
      taskList = taskList.filter(
        (task) =>
          task.title.toLowerCase().indexOf(filteredTitle.toLowerCase()) !== -1
      );
    }

    if (filteredPriority) {
      taskList = taskList.filter((task) => task.priority === filteredPriority);
    }

    if (filteredStatus) {
      taskList = taskList.filter((task) => task.status === filteredStatus);
    }
    console.log(taskList);

    return taskList;
  }
}
