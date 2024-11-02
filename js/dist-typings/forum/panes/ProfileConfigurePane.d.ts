export default class ProfileConfigurePane extends Component<any, undefined> {
    constructor();
    oninit(vnode: any): void;
    loading: boolean | undefined;
    enforceProfileCompletion: {} | undefined;
    profileCompleted: boolean | {} | undefined;
    profileNowCompleted: boolean | undefined;
    answers: any;
    answerValues: {} | undefined;
    user: any;
    dirty: boolean | undefined;
    view(): JSX.Element;
    field(field: any): JSX.Element;
    load(): void;
    set(field: any, value: any): void;
    update(e: any): void;
    parseResponse(response: any): void;
}
import Component from "flarum/common/Component";
