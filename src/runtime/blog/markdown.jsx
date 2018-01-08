import {RComponent} from "../../common/r-component";
const marked = require("marked");

export class MarkDown extends RComponent {

    render() {
        const {value} = this.props;
        return (
            <div dangerouslySetInnerHTML={{__html: marked(value)}}/>
        );
    }
}