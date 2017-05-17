import {extend} from "flarum/extend";
import app from "flarum/app";
import Field from "flagrow/masquerade/models/Field";
import Answer from "flagrow/masquerade/models/Answer";
import addProfileConfigurePane from 'flagrow/masquerade/addProfileConfigurePane';
import addProfilePane from 'flagrow/masquerade/addProfilePane';
import overrideUsersSearchSource from 'flagrow/masquerade/overrideUsersSearchSource';

app.initializers.add('flagrow-masquerade', app => {
    app.store.models['masquerade-field'] = Field;
    app.store.models['masquerade-answer'] = Answer;

    addProfileConfigurePane();
    addProfilePane();

    overrideUsersSearchSource();
});
