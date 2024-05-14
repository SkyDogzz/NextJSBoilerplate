import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { ZodError } from 'zod';
import { registerSchema } from '@/lib/validationSchemas';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, password, name } = req.body;

        try {
            registerSchema.parse({ email, password, name });
        } catch (error) {
            console.error("Validation failed", error);
            if (error instanceof ZodError) {
                res.status(400).json({ error: error.errors });
                return;
            } else {
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        try {
            const newUser = await prisma.user.create({
                data: {
                    email,
                    name,
                    password: hashedPassword,
                }
            });

            res.status(201).json({ user: newUser });
            return;
        } catch (error) {
            res.status(500).json({ error: "Failed to create user" });
            return;
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
        return;
    }
}
