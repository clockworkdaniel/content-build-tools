# Content Build Tools

### How To Use:

First make sure you have installed the node modules in the outer [package.json](/package.json) and also in [app/postcss-plugin/package.json](app/postcss-plugin/package.json), and that [gulp is installed](https://gulpjs.org/getting-started)

Run ```gulp watch```

- Write your sass in [/app/workspace/content.scss](/app/workspace/content.scss)
- When doing so use the mixins set out in [/app/workspace/config.scss](/app/workspace/config.scss)
- Feel free to write your own useful mixins and share them with your fellow developers
- You can store the html of the page your currently working on in [workspace.html](/app/workspace/workspace.html)
- Once you've finished your page upload your content.scss file to the trello ticket


### How It works:

Your Sass in [/app/workspace](/app/workspace) is parsed with [PostCSS](http://postcss.org/).
In short PostCSS is 'A tool for transforming CSS with JavaScript'.
We use a [custom postcss-plugin](/app/postcss-plugin/index.js) to automatically work out padding bottoms etc.

The resulting Sass is stored in [/app/intermediary](/app/intermediary).
This Sass is then compiled into [/app/output](/app/output).


