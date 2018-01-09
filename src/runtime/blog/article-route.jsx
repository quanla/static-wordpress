import classnames from "classnames";
import {RComponent} from "../../common/r-component";
import {articleApi} from "../api/article-api";
import {MarkDown} from "./markdown";

export class ArticleRoute extends RComponent {

    constructor(props, context) {
        super(props, context);

        this.state = {
            article: null,
        };

        articleApi.getArticle("test1").then((article) => {
            this.setState({article});
        });
    }

    render() {
        const {article} = this.state;
        return (
            <div className="article-route">
                {article == null ? (
                    <div className="">
                        Loading...
                    </div>
                ) : (
                    <MarkDown value={article.content}/>
                )}
            </div>
        );
    }
}