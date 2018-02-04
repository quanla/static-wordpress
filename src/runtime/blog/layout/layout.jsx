import classnames from "classnames";
import {RComponent} from "../../../common/r-component";
import {WindowTitle} from "./window-title";

export class Layout extends RComponent {

    render() {
        const {className, children, windowTitle} = this.props;
        return (
            <div className={classnames("layout")}>
                <WindowTitle title={windowTitle && `${windowTitle} — Pure React`}/>

                <div className="header">

                </div>

                <div className={classnames("content", className)}>
                    {children}
                </div>
            </div>
        );
    }
}