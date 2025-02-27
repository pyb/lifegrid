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

const elementToItem = (el:Element, key:number, clickCallback:(name:string)=>void) =>
{
    const id: number | undefined = el.resource?.id;
    const name:string = el.resource?.name || el.task?.name || "";
    return (
        <Item progress={el.progress}
            key={key}
            n={el.n}
            id={el.resource?.id}
            clickCallback={() => clickCallback(name || "")}
            name={el.resource?.name || el.task?.name || (id ? ("Item " + id.toString()) : "Item")}>
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
