import Item from "UI/Item";
import styles from "css/grid.module.css"
import { Children } from 'react';
import * as Types from "game/gameTypes"
import {Element, Resource} from "game/gameTypes"

interface GridProps {
    elements: Array<Element>,
    section: number,
    clickCallback: (id:number) => void,
};

const elementToItem = (el:Element, key:number, clickCallback:(id:number)=>void) =>
{
    const id: number | undefined = el.resource?.id;
    return (
        <Item progress={el.progress}
            key={key}
            id={el.resource?.id}
            clickCallback={() => clickCallback(id || NaN)}
            name={el.resource?.name || (id ? ("Item " + id.toString()) : "Item")}>
        </Item>
    );
}

const Grid = ({elements,  section, clickCallback}:GridProps) => {
    return (
        <div className={section == 1 ? styles.grid1 : styles.grid2}>
            {elements.map((el:Element, key:number) => elementToItem(el, key, clickCallback))}
        </div>
    );
}

export default Grid;
