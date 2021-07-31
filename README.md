# IZ\*ONE VLIVE Archive

Media streaming platform for IZ\*ONE VLIVE livestreams

## Structure

The frontend code is located in `client` using Next.js. See `Local Development` for how to run locally.

The `dogfood` directory is a development environment to sandbox and build out new functionality:

- `dogfood/video-tag` is a `create-react-app` application used to manually modify video metadata to facilitate integration of video types (VPICK, ENOZI, etc.)

## Contributions

This project is open to contributions! Please see [CONTRIBUTING.md](https://github.com/katsukixyz/izone-archive/blob/main/CONTRIBUTING.md) for guidelines.

## Local development

Navigate to `client` and run the following:

```
yarn
yarn dev
```

The frontend site can now be accessed from `http://localhost:3000`.

## Acknowledgements

Big thanks to the `r/izone` subreddit for initial feedback and suggestions.
