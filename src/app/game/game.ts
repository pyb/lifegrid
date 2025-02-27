import * as Types from "game/gameTypes"
import * as Data from "game/gameData"
import { ItemType, Task, TaskInfo, Resource, GameState} from "game/gameTypes"

const jobOutcomes = new Map<string, string>();
jobOutcomes.set("Job", "Dollar");

// action
export const click = (name: string, type:ItemType):Types.GameStateUpdate => {
    return (gs:GameState) => {
        if (type == ItemType.Task){
            if (!gs.ongoingTasks.get(name)) {
                const info:TaskInfo = {
                    task: name,
                    time: 0,
                }
                gs.ongoingTasks.set(name, info);
            }
        }
    }
}

export const gameLoop = (deltaMs: number):Types.GameStateUpdate => (gs:GameState) => {
    //console.log(gs.resources)
    const deltaS:number = deltaMs/1000; // delta in ms
    gs.ongoingTasks.forEach((info:TaskInfo, key:string) => {
        info.time += deltaS;
        const task = <Task>Data.tasksMap.get(info.task);
        if (info.time > task.duration)
        {
            gs.ongoingTasks.delete(key);
            const newResource = jobOutcomes.get(task.name) as string;
            const current:number = gs.resources.get(newResource) || 0;
            gs.resources.set(newResource, current + 1);
        }
    });
    return undefined;
}
