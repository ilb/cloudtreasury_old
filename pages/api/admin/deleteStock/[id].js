import prisma from './../../../../libs/prisma.mjs';

export default async function id(req, res) {
  const { id } = req.query;
  try {
    console.log(id);
    const result = await prisma.Stocks.delete({
      where: {
        stock_id: +id
      }
    });
    res.status(200).json({ message: 'Успешно удалено', status: 'ok', data: result });
  } catch (e) {
    res.status(400).json({ message: 'Ошибка запроса', status: 'error', data: e });
  }
}
