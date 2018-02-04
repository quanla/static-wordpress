import classnames from "classnames";
import {RComponent} from "../../../../common/r-component";
import {articleApi} from "../../../api/article-api";
import {MarkDown} from "../../markdown";
import {AuthorPanel} from "./author-panel";
import {Layout} from "../../layout/layout";
const moment = require("moment");
const {Fragment} = require("react");

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
                    <Fragment>
                        Loading...
                    </Fragment>
                ) : (
                    <Fragment>
                        <div className="author">
                            <AuthorPanel
                                id={article.author}
                                extra={
                                    <div className="">
                                        {moment(article.createdAt).format('ll')}
                                    </div>
                                }
                            />
                        </div>
                        <div className="content">
                            <div className="title">
                                {article.title}
                            </div>
                            <div className="subtitle">
                                {article.subtitle}
                            </div>

                            <MarkDown value={article.content}/>
                        </div>
                    </Fragment>
                )}
            </Layout>
        );
    }
}