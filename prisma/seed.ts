import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
    console.log('seed');
    await Promise.all(
        getComment().map((comment) => {
            return db.ghibriComment.create({data:comment});
        })
    );
}

seed();

function getComment() {
    // shout-out to https://icanhazdadjoke.com/

    return [
        {
            filmId:'2baf70d1-42bb-4437-b551-e5fed5a87abe',
            name: "Road worker",
            content: `I Love it.`,
        }
    ];
}