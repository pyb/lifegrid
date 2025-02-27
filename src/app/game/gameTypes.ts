export type Resource = {
    id: number,
    name: string,
    // upgradeTo:number, // id of the next resource
}

export enum ItemType {
    Resource,
    Task,
}

export type Task = {
    id: number,
    name: string,
    resource: string, // resource name
    qty: number, // resource id,
    duration: number, // in s
}

export type TaskInfo = {
    task: string,
    time: number, // elapsed
} 

export type Element = {
    resource?:Resource,
    task?: Task,
    progress?: number,
    n?: number, // prob makes sense for resources, no tasks?
}

export type GameState = {
    ongoingTasks: Map<string, TaskInfo>,
    resources: Map<string, number>,
}

export type GameStateUpdate = ((gs:GameState) => void);