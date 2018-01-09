import classnames from "classnames";
import {RComponent} from "../../../../common/r-component";
import {authorApi} from "../../../api/author-api";

export class AuthorRoute extends RComponent {

    constructor(props, context) {
        super(props, context);

        this.state = {
            author: null,
        };
        authorApi.getAuthor(props.match.params["id"]).then((author) => {
            this.setState({author});
        });
    }

    render() {
        const {author} = this.state;
        return (
            <div className="article-route">
                {author == null ? (
                    <div className="">
                        Loading...
                    </div>
                ) : (
                    <div className="">
                        <div className="">
                            {author.fullName}
                        </div>
                        <div className="">
                            {author.bio}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}