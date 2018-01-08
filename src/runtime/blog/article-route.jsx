import classnames from "classnames";
import {RComponent} from "../../common/r-component";
import {articleApi} from "../api/article-api";

export class ArticleRoute extends RComponent {

    constructor(props, context) {
        super(props, context);

        this.state = {
            articleContent: null,
        };

        articleApi.getArticleContent("aaa").then((getArticleContent) => this.setState({getArticleContent}));
    }

    render() {
        return (
            <div className="article-route">
                He he he
            </div>
        );
    }
}