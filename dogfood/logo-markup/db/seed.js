import dbConnect from "./dbConnect";
import meta from "../meta/meta.json";
import Video from "./models/Video";

const init = async () => {
  await dbConnect();

  console.info("Creating videos");
  const videos = await Promise.all(
    meta.map(async (meta, i) => {
      const video = new Video({
        id: meta.id,
        actions: [],
        completed: false,
      });

      await video.save();

      return video;
    })
  );

  console.info("Done");
  process.exit();
};

try {
  init();
} catch (e) {
  console.error(e);
}
