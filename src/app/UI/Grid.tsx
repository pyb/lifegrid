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
    if (side == 0)
        return [
            <ResourceItem name="Dollar" resource={Item.Dollar} gs={gs} />,
            <ResourceItem name="Farm" resource={Item.Farm} gs={gs} />,
            <ResourceItem name="Tool" resource={Item.Tool} gs={gs} />,
            <ResourceItem name="Cow" resource={Item.Cow} gs={gs} />,
            <ResourceItem name="Wheat" resource={Item.Wheat} gs={gs} />,
        ];
    else
        return [
            <TaskItem name="Work" task={Item.Work} gs={gs}/>,
            <TaskItem name="Build" task={Item.Build} gs={gs}/>,
            <TaskItem name="Level" task={Item.Lettuce} gs={gs}/>,
    ];
}

const ResourceGrid = ({items}:{items:Array<React.ReactNode>}) => {
    return (
        <div className={styles.resourceGrid}>
            <div className={styles.resourceRow}>
                {items.slice(0,3)}
            </div>
            <div className={styles.resourceRow}>
                {items.slice(3)}
            </div>
        </div>
    );
}

const TaskGrid = ({items}:{items:Array<React.ReactNode>}) => {
    return (
        <div className={styles.taskGrid}>
           {items}
        </div>
    );
}

const Grid = ({side, gs}:GridProps) => {
  return (side == 0 ? 
    <ResourceGrid items={itemList(side, gs)} /> :
    <TaskGrid items={itemList(side, gs)} /> );
}

export default Grid;