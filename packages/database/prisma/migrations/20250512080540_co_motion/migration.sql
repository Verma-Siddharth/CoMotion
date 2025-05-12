-- CreateEnum
CREATE TYPE "RideStatus" AS ENUM ('SCHEDULED', 'ACTIVE', 'ENDED', 'CANCELLED');

-- AlterTable
ALTER TABLE "Ride" ADD COLUMN     "status" "RideStatus" NOT NULL DEFAULT 'SCHEDULED';
