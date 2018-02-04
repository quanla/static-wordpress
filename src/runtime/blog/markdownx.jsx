import {RComponent} from "../../common/r-component";
const marked = require("marked");

export class MarkDownX extends RComponent {

    render() {
        const {value, className} = this.props;
        return (
            <div
                className={className}
                dangerouslySetInnerHTML={{__html: marked(value)}}
            />
        );
    }
}