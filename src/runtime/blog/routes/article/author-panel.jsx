import classnames from "classnames";
import {RComponent} from "../../../../common/r-component";
import {authorApi} from "../../../api/author-api";
import {Link} from "react-router-dom";

export class AuthorPanel extends RComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            author: null,
        };

        authorApi.getAuthor(props.id).then((author) => this.setState({author}));
    }

    render() {
        const {id, extra} = this.props;
        const {author} = this.state;

        return (
            <div className="author-panel">
                {author == null ? (
                    <div className="">
                        Loading...
                    </div>
                ) : (
                    <div className="">
                        <Link to={`/author/${id}/`}>
                            <img src={`/author/${id}/${author.image}`}/>
                        </Link>
                        <Link to={`/author/${id}/`}>
                            {author.fullName}
                        </Link>

                        <div className="sub-content">
                            <div className="">
                                {author.bio}
                            </div>

                            {extra}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}