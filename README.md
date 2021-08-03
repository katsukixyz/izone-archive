# IZ\*ONE VLIVE Archive

Media streaming platform for IZ\*ONE VLIVE livestreams

## Structure

The frontend code for the main site is located in `client` using Next.js. See `Local Development` for how to run locally.

The `dogfood` directory includes development environments to sandbox and build out new functionality:

- `dogfood/video-tag` includes a frontend `create-react-app` application and a backend `Express` api to manually modify video metadata like adding/removing video types (VPICK, ENOZI, etc.) via a control panel.

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
