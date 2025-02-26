import * as Types from "game/gameTypes"
import * as Data from "game/gameData"
import { ItemType, Task, TaskInfo, Resource} from "game/gameTypes"

// action
export const click = (name: string, type:ItemType) => {
    console.log("clicked " + (type==ItemType.Resource ? "resource " : "task ") + name);
    if (type == ItemType.Task){
        if (!ongoingTasks.find (info => info.task == name)) {
            const info:TaskInfo = {
                task: name,
                time: 0,
            }
            ongoingTasks.push(info)
        }
    }
    console.log(ongoingTasks)
}

const ongoingTasks:Array<TaskInfo> = [];
