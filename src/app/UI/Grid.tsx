import styles from "css/grid.module.css"
import { State, Item, ResourceCost } from "game/types";
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
    price?: string,
    text: string,
    hoverText: string,
    progress: number,
    active: boolean,
    clickable: boolean,
    sellable: boolean,
    onClick: () => void,
    // picture ?
};

const GridItem = ({name, qty, text, sellable, clickable, price, goal, hoverText, progress, onClick}:GridItemProps) => {
    const style:string = sellable? styles.sellable :
                         (clickable ? styles.clickable : styles.item);
    return (
        <div className={style} style={progress ? backgroundProp(progress) : {}} onClick={onClick}>
            <div className={styles.resourceName}>
                {name}
            </div>
            <div>
                {(qty !== undefined ?
                    (Math.round(qty).toString()
                        + (goal ?
                            " / " + goal?.toString() :
                            "")) :
                    "")}
            </div>
            <div className={styles.resourcePrice}>
                {price || text || <span>&nbsp;</span>}
            </div>
        </div>
    );
}

const item = (resource:number|undefined, task:number|undefined, gs:State, onClick: () => void, key:number) => {
    const id = (resource||task) as number; 
    const progress:number = gs.taskProgress.get(id) || 0;
    const active:boolean = gs.taskProgress.has(id);
    const qty = gs.resources.get(id);
    let clickable:boolean = false;
    const name:string = (resource ? Data.itemNames.get(resource) : Data.itemNames.get(task as number)) as string;
    let text:string = (resource && Data.crops.has(resource) && gs.sellCrop) ? "-> $": "";
    let goal:number|undefined;
    let price:string |undefined;
    let sellable:boolean = false;
    if (resource)
    {
        const resourceCost= Data.resourceCosts(resource);
        if (resourceCost)
        {
            price = resourceCost.cost.toString() + " " + Data.itemNames.get(resourceCost.resource);
        }
        if (Data.crops.has(resource) &&
            (gs.sellCrop || 
            (gs.resources.get(resource) as number) > Data.minCropForSelling ) )
            sellable = true;
    }
      
    if (price || task)
        clickable = true;
    
    if (task == Item.Level)
    {
        clickable = false;
        text = " " + gs.level.toString();
    }
        
    if (Data.tools.has(id))
         goal = Data.toolGoal; 
  
    return <GridItem key={key} name={name} qty={resource?qty:undefined} clickable={clickable} sellable={sellable}
                     goal={goal} onClick={onClick} active={active} price={price}
                     progress={progress} text={text} hoverText=""/>
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
        item(Item.Dollar, undefined, gs, itemClickCallback(onClick, Item.Dollar), 0),
        item(Item.Farm, undefined, gs, itemClickCallback(onClick, Item.Farm), 1),
        item(gs.tool, undefined, gs, itemClickCallback(onClick, gs.tool), 2),
        item(Item.Cow, undefined, gs, itemClickCallback(onClick, Item.Cow), 3),
        item(gs.crop, undefined, gs, itemClickCallback(onClick, gs.crop), 4),
    ]} /> :
    <TaskGrid items={[
        item(undefined, Item.Work, gs, itemClickCallback(onClick, Item.Work), 10),
        item(undefined, Item.Build, gs, itemClickCallback(onClick, Item.Build), 11),
        item(undefined, Item.Level, gs, itemClickCallback(onClick, Item.Level), 12),
    ]} />);
}

export default Grid;