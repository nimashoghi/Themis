# Themis

Visualized AsyncStorage replacement for React Native during development

![screenshot](https://i.imgur.com/H6sUd6T.png "Screenshot")

## Why?

React Native has had an issue for roughly 2 years where AsyncStorage stops working after the first reload. While this issue has been reported many times (e.g. [here](https://github.com/facebook/react-native/issues/7605) and [here](https://github.com/facebook/react-native/issues/12830)), as of the latest 0.55.x React Native version, this issue still exists. I believe this issue is fixed for 0.56.0 (the big June update), but I cannot currently test this as this update doesn't work on Windows.

Themis is a small wrapper around `AsyncStorage` which allows me to develop seamlessly and just switch back to the default `AsyncStorage` for the production build.

## Getting Started

Install Themis by running:

`npm install themis --save-dev` if using NPM

or

`yarn add themis --dev` if using Yarn

### Running the Server

Run Themis by running `npx themis`.

This will start the backend server, start the state visualizer, and open the visualizer in your browser.

### Integrating with React Native

Using Themis is as easy as importing our `AsyncStorage` wrapper and using the same [AsyncStorage](https://facebook.github.io/react-native/docs/asyncstorage.html) API.

You can do this by importing `AsyncStorage` from the `themis` package.

```js
import {AsyncStorage} from "themis"

// get data using callbacks
AsyncStorage.getItem("myKey", (err, result) => {
    if (err) {
        console.error(err)
    } else {
        console.log(`myKey = ${result}`)
    }
})

// get data using promises
AsyncStorage.getItem("myKey")
    .then(result => console.log(result))
    .catch(err => console.error(err))

// set data
AsyncStorage.setItem("myKey", "myValue")
    .then(() => console.log("Success"))
    .catch(err => console.error(err))
```

### Running the Tests

TODO

## Built With

-   [hapi](https://hapijs.com/) - Used for hosting the API.
-   [React](https://reactjs.org/) - Used for creating the visualizer frontend.
-   [react-json-view](https://github.com/mac-s-g/react-json-view) - Used for displaying the storage state.
-   [node-jsonfile](https://github.com/jprichardson/node-jsonfile) - Used for reading and writing the state into our local file.

## Contributing

TODO

## Authors

-   **Nima Shoghi** - _Original Author_ - [nimashoghi](https://github.com/nimashoghi)

See also the list of [contributors](https://github.com/nimashoghi/Themis/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

-   [Billie Thompson](https://github.com/PurpleBooth/) for her great [README template](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)
