-- CreateTable
CREATE TABLE "Regional" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Regional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Establishment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "regionalId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Establishment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Regional_name_key" ON "Regional"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Establishment_name_key" ON "Establishment"("name");

-- AddForeignKey
ALTER TABLE "Establishment" ADD CONSTRAINT "Establishment_regionalId_fkey" FOREIGN KEY ("regionalId") REFERENCES "Regional"("id") ON DELETE SET NULL ON UPDATE CASCADE;
