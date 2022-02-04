# Alibaba chalange 🚀

## Project setup 👨‍💻

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve || npm run dev
```

### Compiles and minifies for production

```
npm run build
```

## Detail

#### Theme 🎨

I used the easiest and most straight forward approch for the theme switch.
All theme functionality is done by theme class in `@/services/theme.js`.
When app is mounted we check is there is a saved theme in localStorage and use that. (check `App.vue`).
The theme service adds a `.theme-dark` class to the root element and theme dark changes the root variables accordingly.

`varibales.scss`

```scss
:root {
  --al-text-primary: #{$extra-dark-blue};
  --al-bg-primary: #{$light-grey};
  --al-bg-secondary: #{$white};
}

:root.theme-dark {
  --al-text-primary: #{$white};
  --al-bg-primary: #{$dark-blue};
  --al-bg-secondary: #{$blue};
}
```

### General css

I used a css framework approch and made a proper base for my aplication's css. By adding global styles like: `mr-x` or `font-light` or `text-sm`, I made my app easy to develop and change. All of these styles lie in the `@/scss/theme.scss` file.

In the `overrides.scss` file I used the [Normalize.css](https://github.com/necolas/normalize.css/) project in order to make sure my app displays the same styles in all browsers. I changed and removed some parts since they were unnecessary, and also added some parts.

In the `custom.scss` file you'll see some styles needed for the layout. Basically styles that are needed in `App.vue`.

And the pages folder is obviously the css needed for each individual page.

### Genaral structure

The structure of the website is again like a framework. Basically having two folders in components `app` and `core`. Core folder is used for the general components needed throughout the app like: `al-btn` which is a styled btn suitable for using anywhere in the website. You can also add some props in order to change the components like:

```html
<al-btn text> Something <al-btn /></al-btn>
```

Text prop making the button borderless and background-less. The system I used for changing styles based on the props passed might not be the most efficient but it is the most straghit forward.
`Al` is short for alibaba, not the Arabic version of the component. :)

And everything in the app folder is components we use in different places in our app. They are not used in more than two places.

### Store

If you look in the store folder you'll see that there are two modules: `api.js` and `search.js`. As the name suggests `api.js` is in controll of all the api calls and `search.js` is used for all the searching and filtering.

You'll also see a static folder which is where we store all the static json data like all api endpoints.

### Packages

The only external production package used is axios. Because it has a fallback method when fetch is not available and I didn't have time to make that. I could use fetch but again It's [not supported everywhere](https://caniuse.com/fetch).

All the other packages used are for development.

### Performance 📈

#### Web vitals

| Device  |  FCP  |   CLS   |  LCP  |  TTI  | Total score |
| :-----: | :---: | :-----: | :---: | :---: | :---------: |
| Mobile  | 1.9 s | 0.001 s | 3.1 s | 3.6 s |     78      |
| Desktop | 0.8 s |   0 s   | 1.1 s | 1.1 s |     91      |

- Accessibility: 100
- SEO :100
- Best practices: 100

This website got a 78 score in performance in lighthouse for mobile. The build bundle was under 200kb.
Because the search functionality is done locally and it also caches the search result, the search is extremely fast.

This website has been tested in all major browsers and it is confirmed it behaves the same way.

### Analytics 📊

This website uses google analytics to analyze trafic.

### Build

Since we have a lot of unused styles in our app we need to make sure they don't make it to production. Therefore i used the [purgecss](https://github.com/FullHuman/purgecss) plugin with [postcss](https://github.com/postcss/postcss) in order to remove all the unused css classes. Since I already installed postcss I thought it's a good opportunity to use the [autoprifixer](https://github.com/postcss/autoprefixer) plugin for adding the prefixed styles to the website.

I also used Terser webpack plugin for some code minification and uglifying. It reduced abuot `10kb` from the production build.

### Deployment 📦

I used netlify to deploy my website. [Preview of the website](https://determined-joliot-ee81d8.netlify.app/)
