import classnames from "classnames";
import {RComponent} from "../../../../common/r-component";
import {articleApi} from "../../../api/article-api";
import {MarkDown} from "../../markdown";
import {AuthorPanel} from "./author-panel";
import {Layout} from "../../layout/layout";

export class ArticleRoute extends RComponent {

    constructor(props, context) {
        super(props, context);

        this.state = {
            article: null,
        };

        articleApi.getArticle(props.match.params["slug"]).then((article) => {
            this.setState({article});
        });
    }

    render() {
        const {article} = this.state;
        return (
            <Layout
                className="article-route"
                windowTitle={article && article.title}
            >
                {article == null ? (
                    <div className="">
                        Loading...
                    </div>
                ) : (
                    <div className="">
                        <div className="author">
                            <AuthorPanel id={article.author}/>
                        </div>
                        <div className="content">
                            <MarkDown value={article.content}/>
                        </div>
                    </div>
                )}
            </Layout>
        );
    }
}