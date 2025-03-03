import styles from "css/grid.module.css"
import { GameState, Item } from "../game/types";

interface GridItemProps {
    name: string,
    // picture for companion
    text: string,
    hoverText: string,
    progress: number,
    style: string,
    onClick: () => void,
};

// for later
const GridItem = ({name, text, hoverText, progress, style, onClick}:GridItemProps) => {
    return (
        <div className={styles.item} onClick={onClick}>
            {name + " / " + text}
        </div>
    );
}


interface TaskItemProps {
    name: string,
    task: number,
    gs: GameState,
};

const TaskItem = ({name, task, gs}:TaskItemProps) => {
    const progress:number = 0.4;
    return (
        <div className={styles.item}>
            {name + " : " + progress.toString()}
        </div>
    );
}

interface ResourceItemProps {
    name: string,
    resource: number,
    gs: GameState,
};

const ResourceItem = ({name, resource, gs}:ResourceItemProps) => {
    const progress:number = 0.4;
    return (
        <div className={styles.item}>
            {name + " : " + progress.toString()}
        </div>
    );
}

interface GridProps {
    side: number,
    gs:GameState,
};

const itemList = (side: number, gs: GameState) => {
    const dollar = gs.resources.get(Item.Dollar);
    //const work 

    if (side == 0)
        return <>
            <ResourceItem name="Dollar" resource={Item.Dollar} gs={gs} />
            <ResourceItem name="Farm" resource={Item.Farm} gs={gs} />
            <ResourceItem name="Farm" resource={Item.Farm} gs={gs} />
            <ResourceItem name="Farm" resource={Item.Farm} gs={gs} />
            <ResourceItem name="Farm" resource={Item.Farm} gs={gs} />
        </>
    else
        return <>
            <TaskItem name="Work" task={Item.Work} gs={gs}/>
            <TaskItem name="Build" task={Item.Build} gs={gs}/>
            <TaskItem name="Level" task={Item.Lettuce} gs={gs}/>
        </>
}

const Grid = ({side, gs}:GridProps) => {
    return (
        <div className={side == 0 ? styles.resourceGrid :  styles.taskGrid}>
           {itemList(side, gs)}
        </div>
    );
}

export default Grid;