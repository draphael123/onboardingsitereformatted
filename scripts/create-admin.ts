import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const email = "daniel@fountain.net"
  const password = "rarrzor1"
  const name = "Daniel Raphael"

  console.log("Creating/updating admin user...")

  const passwordHash = await bcrypt.hash(password, 12)

  const admin = await prisma.user.upsert({
    where: { email },
    update: {
      passwordHash,
      role: "ADMIN",
      name,
    },
    create: {
      email,
      name,
      passwordHash,
      role: "ADMIN",
    },
  })

  console.log(`✅ Admin user ready!`)
  console.log(`   Email: ${admin.email}`)
  console.log(`   Password: ${password}`)
  console.log(`   Role: ${admin.role}`)
}

main()
  .catch((e) => {
    console.error("❌ Failed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

