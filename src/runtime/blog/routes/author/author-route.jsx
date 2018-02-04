import classnames from "classnames";
import {RComponent} from "../../../../common/r-component";
import {authorApi} from "../../../api/author-api";
import {Layout} from "../../layout/layout";
import {Link} from "react-router-dom";
import {ArticlePreview} from "../common/article-preview";

export class AuthorRoute extends RComponent {

    constructor(props, context) {
        super(props, context);

        this.state = {
            author: null,
            articles: null,
        };
        authorApi.getAuthor(props.match.params["id"]).then((author) => {
            this.setState({author});
        });
        authorApi.getArticles(props.match.params["id"]).then((articles) => {
            this.setState({articles});
        });
    }

    render() {
        const {author, articles} = this.state;
        return (
            <Layout
                className="author-route"
                windowTitle={author && author.fullName}
            >
                {author == null ? (
                    <div className="">
                        Loading...
                    </div>
                ) : (
                    <div className="">
                        <div className="">
                            <div className="">
                                {author.fullName}
                            </div>
                            <div className="">
                                {author.bio}
                            </div>
                        </div>

                        <div className="">
                            <div className="">
                                Articles:
                            </div>

                            {articles && articles.map((article, i) => (
                                <ArticlePreview key={article} code={article}/>
                            ))}
                        </div>
                    </div>
                )}
            </Layout>
        );
    }
}