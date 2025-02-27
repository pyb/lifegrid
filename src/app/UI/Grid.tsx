import Item from "UI/Item";
import styles from "css/grid.module.css"
import {Element, Resource, Source} from "game/gameTypes"

interface GridProps {
    elements: Array<Element>,
    section: number,
    clickCallback: (name:string) => void,
};

const displayCost = (sourcing:Array<Source>):string => {
    let result:Array<string> = [];
    for (const source of sourcing) {
        let s:string = ""
        for (const [resource, value] of source.resources) {
            s += (resource + " : " + value.toString() + "  ");
        }     
        result.push(s);
    }
   
    return result.join(" OR ");
}

const elementToItem = (el:Element, key:number, clickCallback:(name:string)=>void) =>
{
    const id: number | undefined = el.resource?.id;
    const name:string = el.resource?.name || el.task?.name || "";
    let hoverText:string = "";
    if (el.resource)
        hoverText = displayCost(el.resource?.sourcing);
    return (
        <Item progress={el.progress}
            key={key}
            n={el.n}
            hoverText={hoverText}
            clickCallback={() => clickCallback(name || "")}
            name={name || (id ? ("Item " + id.toString()) : "")}>
        </Item>
    );
}

const Grid = ({elements, section, clickCallback}:GridProps) => {
    return (
        <div className={section == 1 ? styles.resourceGrid : styles.taskGrid}>
            {elements.map((el:Element, key:number) => elementToItem(el, key, clickCallback))}
        </div>
    );
}

export default Grid;
