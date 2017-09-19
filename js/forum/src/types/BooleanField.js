import icon from 'flarum/helpers/icon';
import BaseField from 'flagrow/masquerade/types/BaseField';

export default class BooleanField extends BaseField {
    answerContent() {
        return [1, "1", true, "true", "yes"].indexOf(this.content) === 0 ?
            icon('check-square-o') :
            icon('square-o');
    }
}
