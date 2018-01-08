import classnames from "classnames";
import {RComponent} from "../../common/r-component";
import {articleApi} from "../api/article-api";
import {MarkDown} from "./markdown";

export class ArticleRoute extends RComponent {

    constructor(props, context) {
        super(props, context);

        this.state = {
            articleContent: null,
        };

        articleApi.getArticleContent("/sample/article").then((articleContent) => {
            return this.setState({articleContent});
        });
    }

    render() {
        const {articleContent} = this.state;
        return (
            <div className="article-route">
                {articleContent == null ? (
                    <div className="">
                        Loading...
                    </div>
                ) : (
                    <MarkDown value={articleContent}/>
                )}
            </div>
        );
    }
}