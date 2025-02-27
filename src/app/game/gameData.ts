import {Task, Resource} from "game/gameTypes"

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
]

export const resourceMap = new Map<string, Resource>();

export const tasks:Array<Task> = [
    {
        id: 0,
        name: "Job",
        resource: "Dollar",
        qty: 100,
        duration: 2, // seconds
    },
    {
        id: 1,
        name: "Farm",
        resource: "",
        qty: 1,
        duration: 2, // seconds
    },
];

export const tasksMap = new Map<string, Task>();

tasks.forEach(task => tasksMap.set(task.name, task));
resources.forEach(resource => resourceMap.set(resource.name, resource));

/*
export const gameData = {

}
*/