import { Outlet } from "react-router-dom";
import styles from './Root.module.scss';
import Navigation from "../Navigation/Navigation.tsx";

export const Root = () => {
    return (
        <>
            <Navigation/>
            <div id={styles["main"]}>
                <Outlet/>
            </div>
        </>
    )
}