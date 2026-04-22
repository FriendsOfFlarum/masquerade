import { extend } from 'flarum/common/extend';
import app from 'flarum/forum/app';
import UserCard from 'flarum/forum/components/UserCard';
import TypeFactory from './types/TypeFactory';

import type ItemList from 'flarum/common/utils/ItemList';
import type Mithril from 'mithril';
import type User from 'flarum/common/models/User';
import Stream from 'flarum/common/utils/Stream';

export default function mutateUserHero() {
  extend(UserCard.prototype, 'infoItems', function (items: ItemList<Mithril.Children>) {
    const user = (this.attrs as { user: User }).user;
    const answers = app.forum.attribute<boolean>('canViewMasquerade') ? user.bioFields() || [] : [];

    answers.forEach((answer) => {
      const field = answer.field();
      const type = TypeFactory.typeForField({
        field,
        stream: Stream(answer.content() || ''),
      });

      const answerField = type.answerField();
      if (answerField) {
        items.add(`masquerade-bio-${field.id()}`, answerField);
      }
    });
  });
}
