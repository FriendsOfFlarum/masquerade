import {override} from "flarum/extend";
import UsersSearchSource from 'flarum/components/UsersSearchSource';
import LinkButton from 'flarum/components/LinkButton';

export default function () {
    override(UsersSearchSource.prototype, 'view', function (view, query) {
        query = query.toLowerCase();

        const results = this.search(query);

        if (!results.length) return '';

        let searchUserOnPage = '';
        if (app.routes['flagrow_user_directory']) {
            searchUserOnPage = (
                <li>
                    {LinkButton.component({
                        icon: 'search',
                        children: app.translator.trans('flagrow-user-directory.forum.search.users_heading', {query}),
                        href: app.route('flagrow_user_directory', {q: query})
                    })}
                </li>
            )
        }

        return [
            <li className="Dropdown-header">{app.translator.trans('core.forum.search.users_heading')}</li>,
            results.map(user => {
                const name = username(user);
                name.children[0] = highlight(name.children[0], query);

                return (
                    <li className="UserSearchResult" data-index={'users' + user.id()}>
                        <a href={app.route.user(user)} config={m.route}>
                            {avatar(user)}
                            {name}
                        </a>
                    </li>
                );
            }),
            searchUserOnPage
        ];
    })
}
