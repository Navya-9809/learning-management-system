const mongoose = require("mongoose");
const { toYouTubeEmbedUrl } = require("../utils/youtube");

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    thumbnail: { type: String, trim: true, default: "" },
    videoUrl: { type: String, required: true, trim: true },
    embedVideoUrl: { type: String, trim: true, default: "" },
    price: { type: Number, required: true, min: 0 },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

courseSchema.pre("validate", function preValidate(next) {
  const embed = toYouTubeEmbedUrl(this.videoUrl);
  if (!embed) return next(new Error("Invalid YouTube URL"));
  this.embedVideoUrl = embed;
  next();
});

module.exports = mongoose.model("Course", courseSchema);
