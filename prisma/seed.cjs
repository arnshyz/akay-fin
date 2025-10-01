const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();
async function main(){
  const pwdMember = await bcrypt.hash("member123", 10);
  const pwdAdmin = await bcrypt.hash("admin123", 10);
  const member = await prisma.user.upsert({
    where:{ email:"member@akay.finance" }, update:{},
    create:{ name:"Member Akay", email:"member@akay.finance", password:pwdMember, role:"MEMBER", savings:{ create:{ balance:250000 } } }
  });
  const admin = await prisma.user.upsert({
    where:{ email:"admin@akay.finance" }, update:{},
    create:{ name:"Admin Akay", email:"admin@akay.finance", password:pwdAdmin, role:"ADMIN", savings:{ create:{ balance:1000000 } } }
  });
  console.log({ member: member.email, admin: admin.email });
}
main().catch(e=>{console.error(e);process.exit(1)}).finally(()=>prisma.$disconnect());
