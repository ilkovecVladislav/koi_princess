# Koi Princess Slot

Implementation of the game [Koi Princess](https://games.netent.com/video-slots/koi-princess/) .\
Full description of the game, rules and requirements is [here](https://games.netent.com/video-slots/koi-princess/). Click on the question mark or info button in the left bottom conner.

[Demo](https://koi-princess.netlify.app/)

## Run locally

To start the app locally you should clone **this repository**, go to the
`koi_princess` folder, install dependencies and run
project. Steps to help:

```
git clone https://github.com/ilkovecVladislav/koi_princess.git
cd koi_princess
yarn install
yarn start
```

## Commands

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

# Steps to improve

1. Add bonus games
2. Add/Update animations(background animations, spin animations)
3. Add scaling
4. Add tests
5. Add sound effects
6. Add "auto play" mode
7. Add sentry
8. Add game instructions
9. Add stripe(or other payment system in development "mode")
10. Add notifications when the player doesn't have enough money for playing
