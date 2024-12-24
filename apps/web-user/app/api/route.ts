import { PrismaClient } from '@repo/db/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

//Inserting data into User table
async function main(){
    await prisma.user.create({
        data: {
            email: 'abcd@gmail.com',
            name: 'abcd',
            username: 'use_abcd',
        }
    });
}

//For the get request function name is GET
export async function GET(){
	try {
        // Run the main function and insert data
        await main();
        // Disconnect Prisma client
        await prisma.$disconnect();
        // Return a success response
        return NextResponse.json({ message: "Data inserted successfully" });
    } catch (err: any) {
        // Ensure Prisma client disconnects on error
        await prisma.$disconnect();
        // Return an error response
        return NextResponse.json({ message: err.message || "An error occurred" }, { status: 500 });
    }
}