-- CreateTable
CREATE TABLE "StockValuation" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "date" TEXT NOT NULL,
    "ticker" TEXT NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "StockValuation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StockValuation_date_ticker_key" ON "StockValuation"("date", "ticker");
