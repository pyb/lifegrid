import {Task, Resource} from "game/gameTypes"

export const resources:Array<Resource> = [
    {
        id:0,
        name: "Dollar",
    },
    {
        id:1,
        name: "Cow",
    },
    {
        id:1,
        name: "House",
    },
]

export const resourceMap = new Map<string, Resource>();

export const tasks:Array<Task> = [
    {
        id: 0,
        name: "Job",
        resource: "Dollar",
        qty: 1,
        duration: 2, // seconds
    }
];

export const tasksMap = new Map<string, Task>();

tasks.forEach(task => tasksMap.set(task.name, task));
resources.forEach(resource => resourceMap.set(resource.name, resource));

/*
export const gameData = {

}
*/