import { prisma } from "../helpers/utils.js";

export const create = async (req, reply) => {
  const { name, year, brand_id } = req.body;
  const file = req.file;
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
    const { id } = req.query;

    try {
      if (Number(id)) {
        const cars = await prisma.car.findMany({
          where: {
            id: Number(id),
          },
          include: { brand: true },
        });
        return cars;
      } else {
        const cars = await prisma.car.findMany({
          include: { brand: true },
        });
        return cars;
      }
      reply.send(cars);
    } catch (error) {
      reply.status(500).send({ error: "Deu problema mermão" });
    }
  });

export const put = async (req, reply) => {
  const { name, year, brand_id } = req.body;
  const { id } = req.query;
  const file = req.file;

  try {
    const car = await prisma.car.update({
      where: { id: Number(id) },
      data: { name, year, brand_id: Number(brand_id), image_url: file.path },
    });
    console.log(car);
    return reply.status(201).send(car);
  } catch (error) {
    reply.status(500).send({ error: "Deu problema mermão" });
  }
};
