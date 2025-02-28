import {Task, Resource, GameState, TaskInfo} from "game/gameTypes"

// Create a sourcing field  = Array<Source>, chosen earliest-first

export const resources:Array<Resource> = [
    {
        id:0,
        name: "Dollar",
        sourcing: [],
    },
    {
        id:1,
        name: "House",
        sourcing: [{duration:4, resources: [["Dollar", 200]]}],
        duration: 4,
    },
    {
        id:2,
        name: "Cow", // Leading to? 
        sourcing: [{duration:2, resources: [["Dollar", 50]]}],
        duration: 2,
    },
    {
        id:3,
        name: "Farm",
        sourcing: [{duration:10, resources: [["Dollar", 20], ["House", 1], ["Cow", 4]]},
                   {duration:100, resources: [["Dollar", 200], ["House", 2]]}]
    },
    {
        id:4,
        name: "Knowledge",
        sourcing: [],
    },
    {
        id:5,
        name: "Level",
        sourcing: [{duration:60, resources: [["Dollar", 10000]]}],
    },
    {
        id:6,
        name: "Coffee",
        sourcing: [{duration:4, resources: [["Farm", 1]]}],
    },
    {
        id:7,
        name: "Status",
        sourcing: [],
    },
    {
        id:8,
        name: "Tool", // Leading to : Machine , Robot...
        sourcing: [],
    },
    {
        id:9,
        name: "Friend", // Leading to?
        sourcing: [],
    },
];

export const resourceMap = new Map<string, Resource>();

export const jobGain = (gs:GameState):void => {
    const delta:number = 100 * (gs.resources.get("Knowledge") as number);
    const current:number =  gs.resources.get("Dollar") || 0;
    gs.resources.set("Dollar", current + delta);
}

export const farmGain = (gs:GameState):void => {
    const delta:number =  50 * (gs.resources.get("Farm") as number);
    const current:number =  gs.resources.get("Dollar") || 0;
    gs.resources.set("Dollar", current + delta);
}

export const politics = (gs:GameState):void => {
    const status:number =  gs.resources.get("Status") || 0;
    const friends:number =  gs.resources.get("Friend") || 0;
    gs.resources.set("Status", status + 1);
    gs.resources.set("Friend", friends - 1);
}

export const tasks:Array<Task> = [
    {
        id: 0,
        name: "Job",
        resource: "Dollar",
        gain: jobGain,
        duration: 2, // seconds
    },
    {
        id: 1,
        name: "Farm",
        resource: "Dollar",
        gain: farmGain,
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
        gain: politics,
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
