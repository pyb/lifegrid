import styles from "css/grid.module.css"
import { State, Item } from "game/types";
import * as Data  from "game/data";

// TODO : crop selling is modal / different color for each mode

const color1: string = "rgb(86, 37, 37) ";
//const color2: string = "rgb(24, 34, 29) ";
const color2: string = "#443333";

const backgroundProp = (progress:number) => { return {
    background: "linear-gradient(to top, " + color1 + " 0 " + progress.toString()
     + "%, " + color2 + " " + progress.toString() + "% " + (1-progress).toString() +  "%)"
}}

interface GridItemProps {
    name: string,
    qty?: number,
    goal?: number,
    text: string,
    hoverText: string,
    progress: number,
    style: string,
    active: boolean,
    onClick: () => void,
    // picture ?
};

const GridItem = ({name, qty, text, goal, hoverText, progress, style, onClick}:GridItemProps) => {
    return (
        <div className={styles.item} style={progress ? backgroundProp(progress): {}} onClick={onClick}>
            <div>
            {name}
            </div>
            <div>
            {(qty !== undefined ? 
            ( Math.round(qty).toString() 
             + ( goal ? 
                " / " + goal?.toString() :
                "") ) :
            "")}
            </div>
            <div>
            {text}
            </div>
        </div>
    );
}

const item = (name:string, resource:number|undefined, task:number|undefined, gs:State, onClick: () => void, key:number) => {
    const id = (resource||task) as number; 
    const progress:number = gs.taskProgress.get(id) || 0;
    const active:boolean = gs.taskProgress.has(id);
    const qty = gs.resources.get(id);
    let text:string = "";
    let goal:number|undefined;
    
    if (task == Item.Level)
        text = " " + gs.level.toString();
    if (Data.tools.has(id))
         goal = Math.round(qty as number); 
    return <GridItem key={key} name={name} qty={resource?qty:undefined}
                     goal={goal} onClick={onClick} active={active} progress={progress} text={text} hoverText="" style=""/>
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
    gs: State,
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
        item("Spoon", Item.Spoon, undefined, gs, itemClickCallback(onClick, Item.Tool), 2),
        item("Cow", Item.Cow, undefined, gs, itemClickCallback(onClick, Item.Cow), 3),
        item("Potato", Item.Potato, undefined, gs, itemClickCallback(onClick, Item.Potato), 4),
    ]} /> :
    <TaskGrid items={[
        item("Work", undefined, Item.Work, gs, itemClickCallback(onClick, Item.Work), 10),
        item("Build", undefined, Item.Build, gs, itemClickCallback(onClick, Item.Build), 11),
        item("Level", undefined, Item.Level, gs, itemClickCallback(onClick, Item.Level), 12),
    ]} />);
}

export default Grid;