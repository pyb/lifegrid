import {Task, Resource, GameState} from "game/gameTypes"

export const resources:Array<Resource> = [
    {
        id:0,
        name: "Dollar",
        source: [],
    },
    {
        id:1,
        name: "House",
        source: [["Dollar", 200]],
        duration: 4,
    },
    {
        id:2,
        name: "Cow",
        source: [["Dollar", 50]],
        duration: 10,
    },
    {
        id:3,
        name: "Farm",
        source: [["Dollar", 20], ["House", 1], ["Cow", 4]],
        duration: 10,
    },
    {
        id:4,
        name: "Knowledge",
        source: [],
    },
];

export const resourceMap = new Map<string, Resource>();

export const jobReturn = (gs:GameState):number => {
    return 100 * (gs.resources.get("Knowledge") as number);
}

export const farmReturn = (gs:GameState):number => {
    return 50 * (gs.resources.get("Farm") as number);
}

export const tasks:Array<Task> = [
    {
        id: 0,
        name: "Job",
        resource: "Dollar",
        gain: jobReturn,
        duration: 2, // seconds
    },
    {
        id: 1,
        name: "Farming",
        resource: "Dollar",
        gain: farmReturn,
        duration: 4, // seconds
    },
    {
        id: 1,
        name: "Education",
        resource: "Knowledge",
        qty: 1,
        duration: 40, // seconds
    },
];

export const tasksMap = new Map<string, Task>();

tasks.forEach(task => tasksMap.set(task.name, task));
resources.forEach(resource => resourceMap.set(resource.name, resource));
