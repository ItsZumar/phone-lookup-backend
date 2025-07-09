"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_service_1 = require("../common/prisma.service");
const types_1 = require("../common/types");
async function updateUserRole(email, newRole) {
    const prisma = new prisma_service_1.PrismaService();
    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });
        if (!user) {
            console.log(`User with email ${email} not found`);
            return;
        }
        console.log('Current user:', user);
        const updatedUser = await prisma.user.update({
            where: { email },
            data: { role: newRole }
        });
        console.log('Updated user:', updatedUser);
    }
    catch (error) {
        console.error('Error updating user role:', error);
    }
    finally {
        await prisma.$disconnect();
    }
}
updateUserRole('admin@phoneguard.com', types_1.Role.ADMIN);
//# sourceMappingURL=update-user-role.js.map