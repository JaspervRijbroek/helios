import { PrismaClient } from ".prisma/client";
import { hashSync } from "bcrypt";

export default async function usersSeeder(client: PrismaClient) {
    await client.personaCar.deleteMany({});
    await client.persona.deleteMany({});
    await client.user.deleteMany({});

    return client.user.create({
        data: {
            username: 'admin',
            password: hashSync('admin', 10),
            isAdmin: true
        }
    });
}