import prisma from '../../../libs/prisma.mjs';

export default async function getStocks(req, res) {
  setTimeout(async () => {
    const finder = await prisma.Stocks.findMany({
      orderBy: {
        ticker: 'asc'
      }
    });

    res.status(200).json({ data: finder });
  }, 350);
  // Задержка, так как response на изменеие и удаление данных приходит, раньше чем приозводятся изменеия над данными в БД, в связи с чем используя await и fetch мы получаем не актуальные данные.
}

// import nc from 'next-connect';
// import { onNoMatch, onError } from '../../libs/middlewares.mjs';

// export default nc({ onNoMatch, onError }).post(async (req, res) => {
//   // const context = { query: { ...req.query, ...req.body }, req };
//   const finder = await prisma.Stocks.findMany();
//   res.status(200).json({ data: finder });
// });
