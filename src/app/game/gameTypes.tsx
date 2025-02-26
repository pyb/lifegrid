export type Resource = {
    id: number,
    name?: string,
}

export type Element = {
    resource?:Resource,
    progress?: number,
}
