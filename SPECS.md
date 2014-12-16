# requirehit
### Codename: `bootloader`

## Possiveis nomes:
* grephit
* grabit
* requirehit
* graphit

## Meeting schedule

* Problemas que a feature irá cobrir:
  * Locale no lado do cliente;
  * Carregamento dos modulos em off-line no phonegap;
  * Tempo de carregamento da app diminuido;
  * Diminuir o tráfego entre server <-> client;
  * Aumento da performance do server, uma vez que não terá que compilar views;

* Que tipos poderá o `requirehit` carregar:
  * Modo nativo:
    * Css
    * CommonJS
  * Modo RAW:
    * Todos os ficheiros
    * Possibilidade de colocar compilers a processar ficheiros

* Um ficheiro por módulo:
  * Pros:
    * Possibilidade de os modulos serem servidos separadamente via `requirehit serve` ou CDN;
    * Compilar um módulo sempre que algum ficheiro seja alterado (apenas em non-production environment) é mais rápido do que compilar todos os ficheiros/modulos num ficheiro;
    * Possibilidade de utilização de outros módulos directamente de forma a mante-los actualizados;
  * Cons:
    * `null`

* Compilar todos os tipos de dados de um módulo num ficheiro:
  * Pros:
    * Ficará um módulo completo em cache: no browser e no CDN;
    * Diminuição de requests;
  * Cons:
    * Overhead no lado do cliente;


* Questões base para o ficheiro resultante da compilação pelo `requirehit`:
  * Devemos carregar restantes ficheiros RAW no mesmo ficheiro compilado?
    * Pros:
      * Fazer auto-sprite em imagens / css;
    * Cons:
  * Será `js`, `jsonp` ou `json`?
    * JS
  * Como tratar ficheiros opcionais ao funcionamento do módulo?
  * Que módulos irá o `requirehit` constituir como base?

* Estrutura base:


* Definição de um nome para o `requirehit`

## File types
* Native:
    * CommonJS
    * CSS
* Raw:
    * Template
    * Less
    * Locale
    * Fonts
    * Images
    * Sounds
    * And so on...

## Features

* Carregamento de ficheiros do lado do cliente tem que emitir eventos para os modulos interagirem entre si
* Ficheiro de configuração do módulo ( decidir se fará parte do `package.json` )
* Possibilidade de requerer módulos `node_modules` de forma a conseguir incorporar módulos não compatíveis.
* Possibilidade de os ficheiros serem "hasheados" com um algoritmo e uma chave.


## Specs

### - Global specs
1 - Localização de módulos

### - `requirehit init` || `.requirehit.js`

```bash
# Generates a `.requirehit.js` file
requirehit init
```

1 - Ficheiro de configuração do módulo
1.1 - Nome do ficheiro será: `.requirehit.js`
1.2 - Exportará um objecto que seguirá as convenções normais do `package.json`
1.2.1 - O objecto terá que albergar opções

```js
// `.requirehit.js`

module.exports = { // options
    name: 'jquery',
    version: 'x.x.x',

    dependencies: {
        // modulename: 'version', // latest; x.x.x;
        'locale',
    },

    devDependencies: {
        // mocha: 'version',
    },

    compile: { // defaults

        /*
         * Hooks
         */
        before: function ( options ) {
            // ...
        },

        after: function ( package, options ) {
            // ...
        },

        /*
         * Sources options
         */
        sources: [ // So modules can add sources beforeCompile
            // path or blob
        ],

        /*
         * Files to exclude
         */
        exclude: [ // Exclude paths from base
            '.npmignore',
            '.gitignore',
            'package.json',
            'locales/*',
            'tests/*',
            'rsrcs/*',
        ],

        /*
        * Target options
        */
        target: {
            dir: 'dist/requirehit/{{module_name}}-{{module_version}}/',
            base: 'base.rh.js',
        },

        /*
         * Modules options
         */
        modules: {
            js: {
                paths: 'index.js', // string or array
                minify: true,
            },

            less: {
                paths: 'index.less', // string or array
                minify: true,
            },

            i18n: {
                paths: 'locales/*', // string or array
            },

            images: {
                paths: 'images/*', // string or array
            },

            fonts: {
                paths: 'fonts/*', // string or array
            },

            sounds: {
                paths: 'sounds/*', // string or array
            },
        },

    },

    serve: {

        /*
         * Hooks
         */
        before: function ( options ) {
            // ...
        },

        after: function ( package, options ) {
            // ...
        },



    },

    gathering: {

        /*
         * Hooks
         */
        before: function ( name ) {
            // ...
        },

        after: function ( name, package ) {
            // ...
        },

    },

    test: {

        /*
         * Hooks
         */
        before: function () {
            // ...
        },

        after: function () {
            // ...
        },

    },

    /*
     *
     * Hooks than connect on dependent modules
     * For modules that extend others
     *
     */
    dependents: {
        compile: {
            before: function () {
                // ...
            },

            after: function () {
                // ...
            },
        },
        serve: {
            before: function () {
                // ...
            },

            after: function () {
                // ...
            },
        },
        gathering: {
            before: function () {
                // ...
            },

            after: function () {
                // ...
            },
        },
        test: {
            before: function () {
                // ...
            },

            after: function () {
                // ...
            },
        },
    },
};

```

### - `requirehit compile`
```bash
# Compiles base and other targets
requirehit compile

# Test module
requirehit test

```


### - `requirehit test`

### - `requirehit serve`

1 - Terá que compilar um `loader.js` com:
1.1 - Toda a lógica do `requirehit`.
1.2 - Módulos base necessários para o funcionamento do `requirehit` no lado do cliente:
1.2.1 - `bluebird` - `Promise`
1.2.2 - `crypto`
1.2.3 - `http`
1.2.4 - `request` - `Xhr`
1.2.5 - `bluebird`
1.2.6 - `bluebird`
1.2.7 - `bluebird`
1.2.8 - `bluebird`
1.2.9 - `bluebird`


```bash

# Serve content (or produce content and upload into a storage)
requirehit serve
  --config "config/requirehit.js"
  #--sources.path="node_modules,modules,requirehit"
  #--target.dir="rsrcs/"

```

```js
// configuration for requirehit serve
// config/requirehit.js

module.exports = {

    /*
     * Sources options
     */
    sources: {
        paths: [ // Folders with requirehit, bower and npm modules
            'rh_modules',
            'node_modules',
            'bower_modules',
        ],
    }

    /*
     * Target options
     */
    target: {
        dir: 'rsrcs/',
    },

    /*
     * Modules options
     */
    modules: {
        awss3: {
            // ...
        },
    },

};

```
