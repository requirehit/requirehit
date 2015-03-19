requirehit
==========

a spetacular **web package manager** and a **cross-browser nodejs API provider**

Instead of using a mix of `browserify`, `bower` or other package manager, we **ported** and **enhanced** node.js API to browser-side.

### Why does it mean?

- We ported `node.js` API to browser, so your could do things as `require( 'stream' )` and expect same behaviors from within `node.js`.

- We use asyncronous loading without having the need to `define` it as specified on `AMD` pattern, we simply check things it really needs before running it, as `CommonJS` does! We have developed a new pattern based on both `CommonJS` and `AMD` patterns, on top of `Promises` wich is perfect for optional dependencies. Oh yes, I was forgotting, you could have optional dependencies which will run only when you need them!

- You could store your private packages on third-party SaaS (if you offer this kind of service, please create a storage module :) ), but the awesome around this is that you could compile into a folder and serve them by your own! We already created an `AWS S3` storage module.

- We do not serve **Javascript** packages, **we serve web packages**, which means that you could have packages without **js** at all. This is awesome for libraries such as **font-awesome**. For providing this versatilty, we created **adapters**, so they can handle compiling/loading/importing of files. The most is that adapters aren't only responsable for single filetypes, which means that you could have multiple adapters handling different types of files, which is really helpful for compressing, scrambling and other kind of stuff.

### Is requirehit stable?

Wish it was. It is on R&D state, soon we will release an alpha version.
You could contribute by placing issues with ideas for our specs. You could track for first usable release by giving your :+1: into issue #2 .

