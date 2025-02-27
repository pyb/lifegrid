import Item from "UI/Item";
import styles from "css/grid.module.css"
import { Children } from 'react';
import * as Types from "game/gameTypes"
import {Element, Resource} from "game/gameTypes"

interface GridProps {
    elements: Array<Element>,
    section: number,
    clickCallback: (name:string) => void,
};

const displayCost = (cost:Array<[string, number]>):string => {
    let result:string = "";
    for (const [resource, value] of cost) {
        result += (resource + " : " + value.toString() + "  ");
    }
    return result;
}

const elementToItem = (el:Element, key:number, clickCallback:(name:string)=>void) =>
{
    const id: number | undefined = el.resource?.id;
    const name:string = el.resource?.name || el.task?.name || "";
    let hoverText:string = "";
    if (el.resource)
        hoverText = displayCost(el.resource?.source);
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
