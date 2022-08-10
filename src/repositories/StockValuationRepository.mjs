export default class StockValuationRepository {
  constructor({ prisma }) {
    this.prisma = prisma;
  }

  async save({ ticker, date, data }) {
    return await this.prisma.stockValuation.upsert({
      where: {
        date_ticker: {
          ticker,
          date
        }
      },
      create: {
        ticker,
        date,
        data
      },
      update: {
        data
      }
    });
  }

  async findAllByDate(date) {
    return await this.prisma.stockValuation.findMany({
      where: {
        date
      }
    });
  }
}
