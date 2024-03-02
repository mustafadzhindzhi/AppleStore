import { Outlet } from "react-router-dom";
import styles from './Root.module.scss';
import Navitation from "../Navigation/Navitation.tsx";

export const Root = () => {
    return (
        <>
            <Navitation/>
            <div id={styles["main"]}>
                <Outlet/>
            </div>
        </>
    )
}