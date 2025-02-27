import {Task, Resource, GameState, TaskInfo} from "game/gameTypes"

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
        name: "Cow", // Leading to? 
        source: [["Dollar", 50]],
        duration: 2,
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
    {
        id:5,
        name: "Level",
        source: [["Dollar", 10000]],
    },
    {
        id:6,
        name: "Coffee",
        source: [["Farm", 1]],
    },
    {
        id:7,
        name: "Status",
        source: [],
    },
    {
        id:8,
        name: "Tool", // Leading to : Machine , Robot...
        source: [],
    },
    {
        id:9,
        name: "Friend", // Leading to?
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
        name: "Farm",
        resource: "Dollar",
        gain: farmReturn,
        duration: 4, // seconds
    },
    {
        id: 2,
        name: "Study",
        resource: "Knowledge",
        qty: 1,
        duration: 40, // seconds
    },
    {
        id: 3,
        name: "Build",
        resource: "Tool",
        qty: 1,
        duration: 40, // seconds
    },
    {
        id: 4,
        name: "Politics", // This should cost "Friend"
        resource: "Status",
        qty: 1,
        duration: 4, // seconds
    },
    {
        id: 5,
        name: "Play", // This should cost "Friend"
        resource: "Friend",
        qty: 1,
        duration: 4, // seconds
    },
];

export const tasksMap = new Map<string, Task>();

tasks.forEach(task => tasksMap.set(task.name, task));
resources.forEach(resource => resourceMap.set(resource.name, resource));

const initialResources = new Map<string, number>(); // how much of each we have
initialResources.set("Dollar", 0);
initialResources.set("Cow", 0);
initialResources.set("House", 0);
initialResources.set("Farm", 0);
initialResources.set("Knowledge", 1); //  multiplier for job $ returns
initialResources.set("Level", 1);
initialResources.set("Coffee", 1); // To allow 1 task
initialResources.set("Status", 0);
initialResources.set("Friend", 0);

export const initialGameState:GameState = {
    ongoingTasks: new Map<string, TaskInfo>(),
    resources: initialResources,
}
