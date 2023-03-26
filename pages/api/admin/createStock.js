import prisma from '../../../libs/prisma.mjs';

export default async function createStock(req, res) {
  const { ticker, value, isin } = req.body;
  try {
    const finder = await prisma.Stocks.create({
      data: {
        ticker,
        value,
        isin
      }
    });
    res.status(200).json({ message: 'Stock создан', status: 'ok', data: finder });
  } catch (e) {
    res.status(400).json({ message: 'Ошибка запроса', status: 'error', data: e });
  }
}
