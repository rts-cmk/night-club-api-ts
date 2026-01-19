import prisma, { Prisma } from "../../../lib/prisma";
import type { NewEvent } from "./validation";
  
  export async function getAllEvents() {
    return await prisma.event.findMany({
        include: { asset: { omit: { id: true} } },
        omit: { assetId: true }
    });
  }

  export async function getEventById(id: number) {
    return await prisma.event.findUnique({
      where: { id },
      include: { asset: true }
    });
  }

  export async function createEvent (data: NewEvent) {
    if (data.assetId) {
    const image = await prisma.image.findUnique({
      where: { id: data.assetId }
    });
    console.log("Found image:", image);
    if (!image) {
      throw new Error(`Image with id ${data.assetId} not found`);
    }
  }
    
    const event = await prisma.event.create({
      data: {
        title: data.title,
        description: data.description,
        location: data.location,
        date: data.date,
        asset: {
        connect: {
          id: data.assetId
        }
      }
    }
    });
    return event;
  }

  export async function updateEvent(id: number, data: NewEvent) {
    const prismaData: Prisma.EventUpdateInput = {
      title: data.title,
      description: data.description,
      location: data.location,
      date: data.date,
      asset: {
        connect: {
          id: data.assetId
        }
      }
    };
    return prisma.event.update({ where: { id }, data: prismaData });
  }

  export async function deleteEvent(id: number) {
    return prisma.event.delete({ where: { id } });
  }