declare module '@prisma/client' {
  // Minimal PrismaClient typing to allow local builds when generated client is not present.
  // This file is a temporary shim until `prisma generate` / migrations are run.
  export class PrismaClient {
    constructor(options?: any);
    $connect(): Promise<void>;
    $disconnect(): Promise<void>;
    [key: string]: any;
  }
  export type Prisma = any;
}
