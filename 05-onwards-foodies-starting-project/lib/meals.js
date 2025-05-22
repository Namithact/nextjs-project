import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";
const db = sql("meals.db");
export function getMeals() {
  return db.prepare("SELECT * FROM meals").all();
}
export function getMealById(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}
export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, {
    lower: true,
  });
  meal.instructions = xss(meal.instructions);
  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;
  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Error uploading the  file");
    }
  });
  meal.image = `/images/${fileName}`;
  console.log(meal);
  db.prepare(
    `INSERT INTO meals (title, summary, instructions, image, slug, creator, creator_email) 
        VALUES ( 
        @title,
        @summary,
        @instructions,
        @image,
        @slug,
        @creator,
        @creator_email)`
  ).run(meal);
}
