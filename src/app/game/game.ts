import * as Types from "game/gameTypes"
import * as Data from "game/gameData"
import { ItemType, Task, TaskInfo, Resource, GameState} from "game/gameTypes"

const jobOutcomes = new Map<string, string>();
jobOutcomes.set("Job", "Dollar");

export const buyTask = (name: string):Types.GameStateUpdate => {
    return (gs: GameState) => {
        if (!gs.ongoingTasks.get(name)) {
            const info: TaskInfo = {
                task: name,
                time: 0,
            }
            gs.ongoingTasks.set(name, info);
        }
    }
}

export const buyResource = (name: string): Types.GameStateUpdate => {
    return (gs: GameState) => {
        if (gs.ongoingTasks.get(name))
            return;
        const source = <Array<[string, number]>> Data.resourceMap.get(name)?.source;
        for (const [resource, cost] of source)
        {
            const cur = <number>gs.resources.get(resource);
            if (cur < cost)
                return;
        }
        source.forEach(([resource, cost]) => {
            const cur = <number>gs.resources.get(resource);
            console.log(resource)
            console.log(cur)
            gs.resources.set(resource, cur - cost);
        });
        const info: TaskInfo = {
            resource: name,
            time: 0,
        }
        gs.ongoingTasks.set(name, info);
    };
}

// action
export const click = (name: string, type:ItemType):Types.GameStateUpdate => {
    if (type == ItemType.Task)
        return buyTask(name);
    else
        return buyResource(name);
}

export const gameLoop = (deltaMs: number):Types.GameStateUpdate => (gs:GameState) => {
    const deltaS:number = deltaMs/1000; // delta in ms
    gs.ongoingTasks.forEach((info:TaskInfo, key:string) => {
        info.time += deltaS;

        if (info.task)
        {
            const task = <Task>Data.tasksMap.get(info.task);
            if (info.time > task.duration)
            {
                gs.ongoingTasks.delete(key);
                const newResource = jobOutcomes.get(task.name) as string;
                const current:number = gs.resources.get(newResource) || 0;
                gs.resources.set(newResource, current + task.qty);
            }
        }
        else {
            const resourceS = <string>info.resource;
            const resource = <Resource>Data.resourceMap.get(resourceS as string);
            if (info.time > <number>resource.duration)
            {
                gs.ongoingTasks.delete(key);
                const current:number = gs.resources.get(resourceS) || 0;
                gs.resources.set(resourceS, current + 1);
            }
        }
    });
    return undefined;
}

export const getProgress = (name: string, type:Types.ItemType, gs:GameState):number => {
    let duration:number = 0;
    if (type == ItemType.Task)
        duration = Data.tasksMap.get(name)?.duration as number;
    else
        duration = Data.resourceMap.get(name)?.duration as number;
    return (gs.ongoingTasks.get(name)?.time || 0) / duration;
}