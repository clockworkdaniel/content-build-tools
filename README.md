# Content Build Tools

## How To Install:

First clone/download this repo (see the green button top right).

#### Install gulp globaly: 
In terminal run ```npm install --global gulp-cli``` or if that fails try ```sudo npm install --global gulp-cli```

#### Install node modules:
- Open the content-build-tools directory in Visual Studio Code (VSC)
- Open the terminal in VSC (view -> intergrated terminal)
- Run ```npm install``` in the content-build-tools directory (this is where you should already be)
- Navigate to app [app/postcss-plugin](app/postcss-plugin) with ```cd app/postcss-plugin/```
- Run ```npm install``` again
- Navigate back to content-build-tools with ```cd ../../```


## How To Use:

Run ```gulp watch```

- Write your sass in [/app/workspace/content.scss](/app/workspace/content.scss)
- Whenever you save your [/app/output/content.css](/app/output/content.css) will be updated
- You can use mixins set out in [/app/workspace/config.scss](/app/workspace/config.scss)
  - note I've changed our mixins to use [variable arguments](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#variable_arguments) so we can add an optional flush or region specific images
  - you do not need to include padding-bottoms/VW heights as the the PostCSS plugin will work these out for you:
```scss 
    .example {
        @include true-fw(
          $name: '[CLASS GOES HERE]',
          $url: 'https://riverisland.scene7.com/is/image/RiverIsland/c20180109_HP_DENIM_HERO_DNT',
          //optional flush
          $flush '_r',
          //example hard coded regional images
          $urlDE: 'https://riverisland.scene7.com/is/image/RiverIsland/c20180109_HP_DENIM_HERO_DNT_de',
          $urlUS: 'https://riverisland.scene7.com/is/image/RiverIsland/c20180109_HP_DENIM_HERO_DNT_int',
          //you can set a margin-bottom/margin-top here if you want
          $marginTop: 4%
        );
    }
```
  - if you only set only international versions the image will be ```display: none;``` except on the relevant regions
```scss 
    .intl-only-example {
      @include image(
        $urlUS: 'https://riverisland.scene7.com/is/image/RiverIsland/c20180109_HP_DENIM_HERO_DNT_int',
        $urlEU: 'https://riverisland.scene7.com/is/image/RiverIsland/c20180109_HP_DENIM_HERO_DNT_int'
      );
    }
```
- You can store the html of the page your currently working on in [workspace.html](/app/workspace/workspace.html)
- Feel free to write your own useful mixins and share them with your fellow developers
- Once you've finished your page upload your content.scss file to the trello ticket for the next developer to use


## How It works:

- Your Sass in [/app/workspace](/app/workspace) is parsed with [PostCSS](http://postcss.org/).
  - In short, PostCSS is 'A tool for transforming CSS with JavaScript'.
- We use a [custom postcss-plugin](/app/postcss-plugin/index.js) to automatically work out padding-bottoms etc.
- The resulting Sass is stored in [/app/intermediary](/app/intermediary).
- This Sass is then compiled into [/app/output](/app/output).