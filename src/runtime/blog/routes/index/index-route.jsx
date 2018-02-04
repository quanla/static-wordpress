import classnames from "classnames";
import {RComponent} from "../../../../common/r-component";
import {articleApi} from "../../../api/article-api";
import {ArticlePreview} from "../common/article-preview";
import {Layout} from "../../layout/layout";

const {Fragment} = require("react");

export class IndexRoute extends RComponent {

    constructor(props, context) {
        super(props, context);

        this.state = {
            articles: null,
        };

        articleApi.getAllArticles().then((articles) => this.setState({articles}));
    }

    render() {
        const {articles} = this.state;

        return (
            <Layout
                className="index-route"
                windowTitle={`Quan's blog`}
            >
                {articles && articles.map((article) => (
                    <ArticlePreview
                        key={article}
                        code={article}
                    />
                ))}
            </Layout>
        );
    }
}