-- CreateTable
CREATE TABLE "Dictionary" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "code" VARCHAR(100),
    "name" VARCHAR(255),
    "begDate" DATE,
    "endDate" DATE,
    "parentId" INTEGER,

    CONSTRAINT "Dictionary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Dictionary_parentId_code_name_key" ON "Dictionary"("parentId", "code", "name");

-- AddForeignKey
ALTER TABLE "Dictionary" ADD CONSTRAINT "Dictionary_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Dictionary"("id") ON DELETE SET NULL ON UPDATE CASCADE;
