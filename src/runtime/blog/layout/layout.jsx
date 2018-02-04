import classnames from "classnames";
import {RComponent} from "../../../common/r-component";
import {WindowTitle} from "./window-title";
import {Link} from "react-router-dom";

export class Layout extends RComponent {

    render() {
        const {className, children, windowTitle} = this.props;
        return (
            <div className={classnames("layout")}>
                <WindowTitle title={windowTitle && `${windowTitle} — Pure React`}/>

                <div className="header">
                    <div className="header-content">
                        <Link to={`/`} className="home-link">Quân's blog</Link>
                    </div>
                </div>

                <div className={classnames("content", className)}>
                    {children}
                </div>
            </div>
        );
    }
}