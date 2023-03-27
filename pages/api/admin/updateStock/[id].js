import prisma from './../../../../libs/prisma.mjs';

export default async function id(req, res) {
  const { id } = req.query;
  const { ticker, value, isin } = req.body;

  try {
    const updateUser = await prisma.Stocks.update({
      where: {
        stock_id: +id
      },
      data: {
        ticker,
        value,
        isin
      }
    });
    res.status(200).json({ message: 'Успешно изменено', status: 'ok', data: updateUser });
  } catch (e) {
    res.status(400).json({ message: 'Ошибка запроса', status: 'error', data: e });
  }
}
