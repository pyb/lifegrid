import Item from "UI/Item";
import styles from "css/grid.module.css"
import { Children } from 'react';

interface GridProps {
    children: any,
    section: number,
};

const Grid = ({children, section}:GridProps) => {
    return (
        <div className={section == 1 ? styles.grid1 : styles.grid2}>
            {children}
        </div>
    );
}

export default Grid;
