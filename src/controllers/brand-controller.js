import { prisma } from "../helpers/utils.js";

export const create = async (req, reply) => {
  const { name } = req.body;
  console.log(req.body);

  try {
    const brand = await prisma.brand.create({
      data: {
        name,
      },
    });
    return reply.status(201).send(brand);
  } catch (error) {
    console.log(error);
    reply.status(500).send({ error: "Deu problema mermão" });
  }
};
