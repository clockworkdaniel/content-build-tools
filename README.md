# Content Build Tools

### How To Install:

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


### How To Use:

Run ```gulp watch```

- Write your sass in [/app/workspace/content.scss](/app/workspace/content.scss)
- Whenever you save your [/app/output/content.css](/app/output/content.css) will be updated
- You can use mixins set out in [/app/workspace/config.scss](/app/workspace/config.scss) e.g.
  - note you do not need to include padding-bottoms/VW heights as the the PostCSS plugin will do this for you:
```scss 
    .example {
        @include true-fw('https://riverisland.scene7.com/is/image/RiverIsland/c20180109_HP_DENIM_HERO_DNT');
    }
```
- You can store the html of the page your currently working on in [workspace.html](/app/workspace/workspace.html)
- Feel free to write your own useful mixins and share them with your fellow developers
- Once you've finished your page upload your content.scss file to the trello ticket for the next developer to use


### How It works:

Your Sass in [/app/workspace](/app/workspace) is parsed with [PostCSS](http://postcss.org/).
In short, PostCSS is 'A tool for transforming CSS with JavaScript'.
We use a [custom postcss-plugin](/app/postcss-plugin/index.js) to automatically work out padding-bottoms etc.
The resulting Sass is stored in [/app/intermediary](/app/intermediary).
This Sass is then compiled into [/app/output](/app/output).


