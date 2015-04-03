requirehit
==========

a spetacular **web package manager** and a **cross-browser nodejs API provider**

### Work in Progress

Instead of using a mix of `browserify`, `bower` or other package manager, we **ported** and **enhanced** node.js API to browser-side.

# What does it means?

- We ported `node.js` API to browser, so your could do things as `require( 'stream' )` and expect same behaviors from within `node.js`.

- We use asyncronous loading without having the need to `define` it as specified on `AMD` pattern, we simply check things it really needs before running it, as `CommonJS` does! We have developed a new pattern based on both `CommonJS` and `AMD` patterns, on top of `Promises` wich is perfect for optional dependencies. Oh yes, I was forgotting, you could have optional dependencies which will run only when you need them!

- You could store your private packages on third-party SaaS (if you offer this kind of service, please create a storage module :) ), but the awesome around this is that you could compile into a folder and serve them by your own! We already created an `AWS S3` storage module.

- We do not serve **Javascript** packages, **we serve web packages**, which means that you could have packages without **js** at all. This is awesome for libraries such as **font-awesome**. For providing this versatilty, we created **adapters**, so they can handle compiling/loading/importing of files. The most is that adapters aren't only responsable for single filetypes, which means that you could have multiple adapters handling different types of files, which is really helpful for compressing, scrambling and other kind of stuff.


# Instalation

```bash

    npm i -g requirehit

```

# Questions

I belive that is easier to you to understand by placing a kind of FAQ for usage
explaination.

If you are always with hurry as I am most of the times, and you do read things
horizontally I suggest you to take a little of time to read this entirely just
because it's worthed!

So, here are the questions:


## Why developing a package manager when there are already exists some available?

We have done some research arround front-end package managers, we figured out
some but they didn't were so versatile as we were looking for. So we started
our creative process by creating initial specs on how everything would work.

While we were already coding `requirehit`, we spoted `webpack`. It could do
almost everything that we needed, but inspite it was modular and awesome, it
didn't fit our needs.

We needed something which we could (easily):
- apply under a lot of already existing npm modules without having to PR them
and wait until someone accepts it;
- bring them to front-end without having to `browserify` them (actually we did
the opposite of all package managers, we bought `node.js` sources to browser);
- place them on CDNs such AWS Cloudfront, by uploading them to a S3 bucket, and
thats why we have `storages`;
- have packages with only *html*, *tpl* or *css* files;
- and more reasons I can't recall ATM, but as soon i remember them I will update
this README! :)


## Do i need to setup a `package.json`?

By default, our configuration runs up from a `.rh.js` file, but we have worked
out (at our code gym :p) to provide compability-mode for those that already
have a module configured with a `package.json`.


## Why so have you created `.rh.js` instead of using `package.json`?

Well, thats pretty easy to explain. I've said before that we needed to define
optional modules, and as you may know, `package.json` doesn't support it.
We ended up on a more complex but fair easier way to configure packages:

We accept an *Object* as `dependencies` options which you have to include
objects for different proposes.

**IMPORTANT NOTE:** If you choose to provide an object without some of those
keys, **requirehit** will suppose that all things are modules and required.

### `required`

Here you will include packages that you would include as `dependencies` on a
regular `package.json` file. It will respect **exacly the same** API, that means
that you could place up: *semver wildcards*, *git*, *tar* and that kind of stuff!

#### Examples:
```json
{
    "required": {
        "findhit-util": "^0.2.3"
    }
}
```

### `optional`

We load components when we need them, that improves significally performance and
its why we didn't pick any other *package builder/loader*.

As so, you could place here all optional packages exacly the same way as you do
on `required`, the only difference is that you should use any async require way
such as `promise` or `callback` (you will understand in a few minutes how).

#### Examples:
```json
{
    "optional": {
        "some-new-fancy-component-that-you-wont-need-always": "latest"
    }
}
```


### `environment-(required|optional)-(your_environment)`

Here is the interesting part that I've not mentioned earlier! We figured out
that we need sometimes to include packages on specific environments, not only
on `testing` environment where you need *test suits* but also on different
development versions.

Internally we have four development stages: `sdk`, `analysis`, `testing` and `dev`.

`sdk` is the environment of our modules into each *developer* computer.
`analysis` is when our modules run over a specific PR, this is pretty useful
since we can stack up failings before changing it into `testing` state.
`testing` is for CI tests, well, name says all right?
`dev` is for an internal server we have which we show up all new exciting features
we will merge on next version release! The most important propose for us is the
fact that we can checkup for bugs before release a `beta`.


#### Examples:
```json
{
    "environment-required-dev": {
        "internal-bug-reporter": "git://.../../../bug-reporter.git"
    }
}
```


## How do i load modules on my JS?

### CommonJS way (valid for required modules only)

#### One by one
```js
    var One = require( 'one' );
    var Two = require( 'two' );
```

#### Bulk requiring
```js
    var modules = require([ 'one', 'two' ]);

    // module[0] or module.one will be One
    // module[1] o module.two will be Two
```


### Promise way (valid for required and optional modules)

#### One by one
```js
    // ...

    require( 'one', 'promise' )
    .then(function ( One ) {
        // One will have `one` module
    });
```

#### Bulk requiring
```js
    require([ 'one', 'two' ], 'promise')
    .then(function ( modules ) {
        // module[0] or module.one will be One
        // module[1] o module.two will be Two
    })

    // You could also use `.spread`
    .spread(function ( one, two ) {
        // one will be One
        // two will be Two
    });
```



### Callback way (valid for required and optional modules)

#### One by one
```js
    // ...

    require( 'one', function ( One ) {
       // One 
    });

```

#### Bulk requiring
```js
    require( [ 'one', 'two', 'three' ], function ( one, two, three ) {
        // one will be One
        // two will be Two
        // three will be Three
    });

    // or

    require( [ 'one', 'two', 'three' ], function ( modules ) {
        // module[0] or module.one will be One
        // module[1] o module.two will be Two
        // module[2] o module.three will be Three
    });
```

This seems `AMD` pattern right? :)



### Module way (valid for required and optional modules)

This method is available for those who want to handle module loading manually or
out of promise or callback scopes ( such as observers and so on ).

#### One by one
```js
    // ...

    var module = require( 'one', 'module' );

    // When module.loaded turns truth
    // module.exports will be One

```

#### Bulk requiring
```js
    var modules = require( [ 'one', 'two', 'three' ], 'module' );

    // When `module.loaded` turns truth
    // `module.exports` will be One
```



## What about files?

You could load files from your module or from another module, the only
difference is that you will get them as a string or blob if they aren't
threated by any **adapter**.
