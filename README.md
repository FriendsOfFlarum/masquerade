# Masquerade by ![Flagrow logo](https://avatars0.githubusercontent.com/u/16413865?v=3&s=20) [Flagrow](https://discuss.flarum.org/d/1832-flagrow-extension-developer-group), a project of [Gravure](https://gravure.io/)

[![MIT license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/flagrow/masquerade/blob/master/LICENSE.md) [![Latest Stable Version](https://img.shields.io/packagist/v/flagrow/masquerade.svg)](https://packagist.org/packages/flagrow/masquerade) [![Total Downloads](https://img.shields.io/packagist/dt/flagrow/masquerade.svg)](https://packagist.org/packages/flagrow/masquerade) [![Donate](https://img.shields.io/badge/patreon-support-yellow.svg)](https://www.patreon.com/flagrow) [![Join our Discord server](https://discordapp.com/api/guilds/240489109041315840/embed.png)](https://flagrow.io/join-discord)

The user profile generator. Includes:

- New tab on user profile to show masquerade profile with answers provided to configured fields.
- New tab on user profile for user to set up a masquerade profile.
- Add, update, delete and order profile fields in admin.
- Permission who can have a masquerade profile.
- Permission who can view a masquerade profile.
- Allowing you to configure forced redirection to make a (email verified) user complete the required fields.

![](https://discuss.hyn.me/assets/files/2017-05-16/1494967396-0-masquerade-demo.gif)

## Installation

Use [Bazaar](https://discuss.flarum.org/d/5151-flagrow-bazaar-the-extension-marketplace) or install manually:

```bash
composer require flagrow/masquerade
```

## Updating

```bash
composer update flagrow/masquerade
php flarum migrate
php flarum cache:clear
```

## Configuration

Enable the extension. Visit the masquerade tab in the admin to configure the fields. 

Be aware that the "Add new field" and "Edit field <foo>" toggle the field form when clicked.

Make sure you configure the masquerade permissions on the Admin Permissions tab to your needs.

## Support our work

We prefer to keep our work available to everyone.
In order to do so we rely on voluntary contributions on [Patreon](https://www.patreon.com/flagrow).

## Security

If you discover a security vulnerability within Masquerade, please send an email to the Gravure team at security@gravure.io. All security vulnerabilities will be promptly addressed.

Please include as many details as possible. You can use `php flarum info` to get the PHP, Flarum and extension versions installed.

## Links

- [Flarum Discuss post](https://discuss.flarum.org/d/5791-flagrow-masquerade-user-profile-builder)
- [Source code on GitHub](https://github.com/flagrow/masquerade)
- [Changelog](https://github.com/flagrow/masquerade/blob/master/CHANGELOG.md)
- [Report an issue](https://github.com/flagrow/masquerade/issues)
- [Download via Packagist](https://packagist.org/packages/flagrow/masquerade)

An extension by [Flagrow](https://flagrow.io/), a project of [Gravure](https://gravure.io/).
