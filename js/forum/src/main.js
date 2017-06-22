import {extend} from "flarum/extend";
import app from "flarum/app";
import User from "flarum/models/User";
import Field from "flagrow/masquerade/models/Field";
import Answer from "flagrow/masquerade/models/Answer";
import Model from 'flarum/Model';

import addProfileConfigurePane from 'flagrow/masquerade/addProfileConfigurePane';
import addProfilePane from 'flagrow/masquerade/addProfilePane';
import mutateUserBio from 'flagrow/masquerade/mutateUserBio';

app.initializers.add('flagrow-masquerade', app => {
    app.store.models['masquerade-field'] = Field;
    app.store.models['masquerade-answer'] = Answer;

    User.prototype.bioFields = Model.hasMany('bioFields');

    addProfileConfigurePane();
    addProfilePane();

    mutateUserBio();
});
