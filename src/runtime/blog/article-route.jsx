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

        // console.log(1);
        articleApi.getArticle("article").then((article) => {
            // console.log(2);
            this.setState({article});
        });
        // console.log(3);
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