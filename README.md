# Masquerade by FriendsOfFlarum

![License](https://img.shields.io/badge/license-MIT-blue.svg) [![Latest Stable Version](https://img.shields.io/packagist/v/fof/masquerade.svg)](https://packagist.org/packages/fof/masquerade)

The user profile generator. Includes:

- New tab on user profile to show masquerade profile with answers provided to configured fields.
- New tab on user profile for user to set up a masquerade profile.
- Add, update, delete and order profile fields in admin.
- Permission who can have a masquerade profile.
- Permission who can view a masquerade profile.
- Allowing you to configure forced redirection to make a (email verified) user complete the required fields.

## Installation

```bash
composer require fof/masquerade:*
```

## Update

```sh
composer require fof/masquerade:*
php flarum migrate
php flarum cache:clear
```

## Configuration

Enable the extension. Visit the masquerade tab in the admin to configure the fields. 

Be aware that the "Add new field" and "Edit field <foo>" toggle the field form when clicked.

Make sure you configure the masquerade permissions on the Admin Permissions tab to your needs.

## Links

- [Flarum Discuss post](https://discuss.flarum.org/d/5791)
- [Source code on GitHub](https://github.com/FriendsOfFlarum/masquerade)
- [Report an issue](https://github.com/FriendsOfFlarum/masquerade/issues)
- [Download via Packagist](https://packagist.org/packages/fof/masquerade)

An extension by [FriendsOfFlarum](https://github.com/FriendsOfFlarum)
