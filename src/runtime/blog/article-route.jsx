import classnames from "classnames";
import {RComponent} from "../../common/r-component";
import {articleApi} from "../api/article-api";

export class ArticleRoute extends RComponent {

    constructor(props, context) {
        super(props, context);

        this.state = {
            articleContent: null,
        };

        articleApi.getArticleContent("aaa").then((articleContent) => {
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
                    <div className="">
                        {articleContent}
                    </div>
                )}
            </div>
        );
    }
}