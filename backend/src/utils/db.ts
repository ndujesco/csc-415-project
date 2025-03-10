import { PrismaClient } from '@prisma/client';

// creates and return a reusable prisma client

class Prisma{
    public prisma = new PrismaClient();
    async connectDB(){
        try{
            await this.prisma.$connect();
            console.log("Connected to Database Successsfully");
        }catch(error){
            console.error("Error Connecting to Database",error);
            process.exit(1);
        }finally{
            await this.prisma.$disconnect();
        }
    }
};

const prisma = new Prisma().prisma;
export {prisma, Prisma};