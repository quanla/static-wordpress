import classnames from "classnames";
import {RComponent} from "../../../../common/r-component";
import {authorApi} from "../../../api/author-api";
import {Layout} from "../../layout/layout";
import {Link} from "react-router-dom";

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
                className="article-route"
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
                                <Link to={`/article/${article}`} className="" key={i}>
                                    {article}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </Layout>
        );
    }
}