import Button from 'flarum/components/Button';
import BaseField from './BaseField';

export default class TextField extends BaseField {
    static updateInterval;

    editorInputProps() {
        let props = super.editorInputProps();
        props.placeholder = '';
        props.onfocus = this.startUpdatingPreview.bind(this);
        props.onfocusout = this.stopUpdatingPreview.bind(this);
        return props;
    }

    baseElementSelector() {
        return '.Field-text[data-id="'+this.field.id()+'"]';
    }

    startUpdatingPreview() {
        TextField.updateInterval = setInterval(this.updatePreview.bind(this), 200);
    }

    stopUpdatingPreview() {
        clearInterval(TextField.updateInterval);
        document.querySelector(this.baseElementSelector() + ' .js-preview').style.display = 'none';
    }

    updatePreview() {
        const content = document.querySelector(this.baseElementSelector() + ' textarea').value;
        s9e.TextFormatter.preview(content, document.querySelector(this.baseElementSelector() + ' .js-preview'));
        document.querySelector(this.baseElementSelector() + ' .js-preview').style.display = 'block';
    }

    answerContent() {
        return m.trust(this.value());
    }

    editorInput() {
        return m('.Field-text', {'data-id': this.field.id()}, [
            m('.js-preview', {
                style: {
                    display: 'none',
                    opacity: 0.5,
                    'max-height': '400px',
                    overflow: 'auto',
                },
            }),
            m('textarea', this.editorInputProps())
        ]);
    }

}

