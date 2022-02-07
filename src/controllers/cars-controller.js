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

export const del =
  (`/cars`,
  async (req, reply) => {
    const { id } = req.query;
    try {
      const car = await prisma.car.delete({
        where: {
          id: Number(id),
        },
      });
      reply.json(car);
    } catch (error) {
      reply.status(500).send({ error: "Deu problema mermão" });
    }
  });

export const get =
  ("/cars",
  async (req, reply) => {
    try {
      const cars = await prisma.car.findMany();
      console.log(cars);
      reply.send(cars);
    } catch (error) {
      console.log(error);
      reply.status(500).send({ error: "Deu problema mermão" });
    }
  });
