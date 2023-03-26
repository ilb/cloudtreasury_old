-- CreateTable
CREATE TABLE "Stocks" (
    "stock_id" SERIAL NOT NULL,
    "ticker" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "isin" TEXT,

    CONSTRAINT "Stocks_pkey" PRIMARY KEY ("stock_id")
);
