import { extend } from 'flarum/common/extend';
import app from 'flarum/forum/app';
import UserCard from 'flarum/forum/components/UserCard';
import TypeFactory from './types/TypeFactory';

import type ItemList from 'flarum/common/utils/ItemList';
import type Mithril from 'mithril';
import type User from 'flarum/common/models/User';

export default function mutateUserHero() {
  extend(UserCard.prototype, 'infoItems', function (items: ItemList<Mithril.Children>) {
    const user = (this.attrs as { user: User }).user;
    const answers = app.forum.attribute<boolean>('canViewMasquerade') ? user.bioFields() || [] : [];

    items.add(
      'masquerade-bio',
      <div>
        {answers.map((answer) => {
          console.log('Answer: ', answer);
          const field = answer.attribute('field');
          const type = TypeFactory.typeForField({
            field,
            value: answer.attribute('content'),
          });

          return type.answerField();
        })}
      </div>
    );
  });
}
