"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_service_1 = require("../common/prisma.service");
const types_1 = require("../common/types");
const bcrypt = require("bcrypt");
async function createAdmin() {
    const prisma = new prisma_service_1.PrismaService();
    try {
        const existingAdmin = await prisma.user.findUnique({
            where: { email: 'admin@phoneguard.com' }
        });
        if (existingAdmin) {
            console.log('Admin user already exists');
            return;
        }
        const hashedPassword = await bcrypt.hash('password', 10);
        const admin = await prisma.user.create({
            data: {
                email: 'admin@phoneguard.com',
                password: hashedPassword,
                name: 'Admin User',
                role: types_1.Role.ADMIN,
            }
        });
        console.log('Admin user created successfully:', admin);
    }
    catch (error) {
        console.error('Error creating admin user:', error);
    }
    finally {
        await prisma.$disconnect();
    }
}
createAdmin();
//# sourceMappingURL=create-admin.js.map