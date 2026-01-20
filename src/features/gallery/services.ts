import prisma, { Prisma } from "../../../lib/prisma";

    export function getAllImages() { 
        return prisma.image.findMany({
            where: {
                altText: "Night Club Atmosphere"
            }
        });
    }