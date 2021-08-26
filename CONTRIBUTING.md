# Contributing

Rainbow button is a React component library written in Typescript using the [`tsdx`](https://tsdx.io) toolchain.

## Building

```console
# in the root of the repo
yarn
yarn run build
```

## Developing

```console
# in the root of the repo
yarn
yarn start
```

This will automatically regenerate the library wheny you make changes to it.

## Testing

Make sure the tests pass on contributions. Using the linter within your editor will help catch bugs early. 

```console
yarn test
yarn lint
```

## Example

See [./example](./example) code for an simple implementation example that is deployed to [rainbow-me.github.io/rainbow-button/](https://rainbow-me.github.io/rainbow-button/).

To run the example locally, you can do the folliwing:

```console
# in the root of the repo
yarn
# build rainbow-button library
yarn build
cd example
rm -rf node_modules yarn.lock dist
yarn
yarn start
```

*Note:*  This copies the locally built rainbow-button into `example/node_modules`. If you would like to modify `rainbow-button` and have the changes relfected automatically in the running example, you need to link `rainbow-button` with `rainbow-botton/example`.

```console
# in the root of the repo
yarn
yarn link
yarn watch
```

In another console

```console
cd example
yarn
yarn @rainbow-me/rainbow-button
yarn start
```
