import prisma from '../../../libs/prisma.mjs';

export default async function getStocks(req, res) {
  const finder = await prisma.Stocks.findMany({
    orderBy: {
      ticker: 'asc'
    }
  });

  res.status(200).json({ data: finder });
}
