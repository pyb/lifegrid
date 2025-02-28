export type Resource = {
    id: number,
    name: string,
    sourcing:Array<Source>,
    duration?: number, // to purchase
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
    resources?: Array<[string, number]>,
    gain?: (gs:GameState) => void,
    qty?: number, // resource id,
    duration: number, // in s
}

export type TaskInfo = {
    task?: string,
    resource?: string,
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

export type Source = {
    duration:number,
    resources:Array<[string, number]>, 
} 

export type GameStateUpdate = ((gs:GameState) => void);