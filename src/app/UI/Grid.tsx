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

const GridItem = ({name, text, hoverText, progress, style, onClick}:GridItemProps) => {
    return (
        <div className={styles.item} onClick={onClick}>
            {name + " / " + text + " ( " + progress.toString() + " ) "}
        </div>
    );
}

const item = (name:string, resource:number|undefined, task:number|undefined, gs:GameState, onClick: () => void, key:number) => {
    const progress:number = 0.4;
    return <GridItem key={key} name={name} onClick={onClick} progress={progress} text="" hoverText="" style=""/>
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

interface GridProps {
    side: number,
    gs:GameState,
    onClick: (item:number) => void,
};

const itemClickCallback = (onClick:(item:number) => void, item:number) => {
    return () => onClick(item);
}

const Grid = ({side, gs, onClick}:GridProps) => {
  return (side == 0 ? 
    <ResourceGrid items= {[
        item("Dollar", Item.Dollar, undefined, gs, itemClickCallback(onClick, Item.Dollar), 0),
        item("Farm", Item.Farm, undefined, gs, itemClickCallback(onClick, Item.Farm), 1),
        item("Tool", Item.Tool, undefined, gs, itemClickCallback(onClick, Item.Tool), 2),
        item("Cow", Item.Cow, undefined, gs, itemClickCallback(onClick, Item.Cow), 3),
        item("Wheat", Item.Wheat, undefined, gs, itemClickCallback(onClick, Item.Wheat), 4),
    ]} /> :
    <TaskGrid items={[
        item("Work", undefined, Item.Work, gs, itemClickCallback(onClick, Item.Work), 10),
        item("Build", undefined, Item.Build, gs, itemClickCallback(onClick, Item.Build), 11),
        item("Level", undefined, Item.Level, gs, itemClickCallback(onClick, Item.Level), 12),
    ]} />);
}

export default Grid;