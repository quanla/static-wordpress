import classnames from "classnames";
import {RComponent} from "../../../../common/r-component";
import {Link} from "react-router-dom";

const articleApi = require("../../../api/article-api").articleApi;

const {Fragment} = require("react");

export class ArticlePreview extends RComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            article: null,
        };

        articleApi.getArticleManifest(props.code).then((article) => this.setState({article}));
    }

    render() {
        const {code} = this.props;
        const {article} = this.state;

        return (
            <div className="article-preview">
                {article && (
                    <Fragment>
                        <div className="title">
                            <Link to={`/article/${code}/`}>{article.title}</Link>
                        </div>
                        <div className="subtitle">
                            <Link to={`/article/${code}/`}>{article.subtitle}</Link>
                        </div>
                    </Fragment>
                )}
            </div>
        );
    }
}