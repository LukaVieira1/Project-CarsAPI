import { prisma } from "../helpers/utils.js";

export const create = async (req, reply) => {
  const { name, year, brand_id } = req.body;
  const file = req.file;
  console.log(file);
  try {
    const car = await prisma.car.create({
      data: {
        name,
        year,
        brand_id: Number(brand_id),
        image_url: file.path,
      },
    });
    return reply.status(201).send(car);
  } catch (error) {
    console.log(error);
    reply.status(500).send({ error: "Deu problema mermão" });
  }
};
