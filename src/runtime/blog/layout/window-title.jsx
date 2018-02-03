import {RComponent} from "../../../common/r-component";

export class WindowTitle extends RComponent {

    constructor(props, context) {
        super(props, context);

        setImmediate(() => {
            try {
                document.title = props.title;
            } catch (e) {

            }
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.title != this.props.title && nextProps.title != null) {
            document.title = nextProps.title;
        }
    }

    render() {
        return null;
    }
}