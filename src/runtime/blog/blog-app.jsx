import classnames from "classnames";
import {RComponent} from "../../common/r-component";
import {ArticleRoute} from "./article-route";

export class BlogApp extends RComponent {

    render() {
        return (
            <div className="blog-app">
                <ArticleRoute/>
            </div>
        );
    }
}