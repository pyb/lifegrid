import * as Types from "game/gameTypes"
import * as Data from "game/gameData"
import { ItemType, Task, TaskInfo, Resource, GameState} from "game/gameTypes"

const jobOutcomes = new Map<string, string>();
Data.tasks.forEach((t:Task) => {
    jobOutcomes.set(t.name, t.resource);
});

// still allowing multi-tasking...
export const buyTask = (name: string):Types.GameStateUpdate => {
    return (gs: GameState) => {
        const maxTasks = <number>gs.resources.get("Coffee");

        if (!Data.tasksMap.get(name) ||
            (name == "Farming" && gs.resources.get("Farm") == 0) ||
            gs.ongoingTasks.get(name) ||
            gs.ongoingTasks.size >= maxTasks)
            {
                return;
            }
        const info: TaskInfo = {
            task: name,
            time: 0,
        }
        gs.ongoingTasks.set(name, info);
        
    }
}

export const buyResource = (name: string): Types.GameStateUpdate => {
    return (gs: GameState) => {
        if (gs.ongoingTasks.get(name))
            return;
        if (!Data.resourceMap.get(name))
            return;
        const source = <Array<[string, number]>> Data.resourceMap.get(name)?.sourcing[0].resources; // TODO : review all sources
        if (!source)
            return;
        for (const [resource, cost] of source)
        {
            const cur = <number>gs.resources.get(resource);
            if (cur < cost)
                return;
        }
        source.forEach(([resource, cost]) => {
            const cur = <number>gs.resources.get(resource);
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
                let delta:number;
                if (task.gain)
                    delta = task.gain(gs);
                else 
                    delta = <number>task.qty;
                gs.resources.set(newResource, current + delta);
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