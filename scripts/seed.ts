const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

// async function main() {
//   try {
//     await database.category.createMany({
//       data: [
//         { name: "Computer Science" },
//         { name: "Music" },
//         { name: "Fitness" },
//         { name: "Photography" },
//         { name: "Accounting" },
//         { name: "Engineering" },
//         { name: "Filming" },
//       ]
//     });

//     console.log("Success");
//   } catch (error) {
//     console.log("Error seeding the database categories", error);
//   } finally {
//     await database.$disconnect();
//   }
// }

async function main() {
  try {
    // Atualiza os registros na tabela Course onde o userId é "teste ti"
    await database.course.updateMany({
      where: {
        userId: "teste ti"
      },
      data: {
        userId: "user_2iHvdIUw5vrjFyOfM15Jj2OA9Qk"
      }
    });

    console.log("Success");
  } catch (error) {
    console.log("Error updating the database", error);
  } finally {
    await database.$disconnect();
  }
}

main();