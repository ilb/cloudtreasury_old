export default class GetStockValuationsReport {
  constructor({ stockValuationRepository, documentRenderer }) {
    this.stockValuationRepository = stockValuationRepository;
    this.documentRenderer = documentRenderer;
  }

  async process({ currentDate }) {
    const stockValuations = await this.stockValuationRepository.findAllByDate(currentDate);

    const renderOptions = {
      attachmentName: `${currentDate}`,
      format: 'xlsx',
      formatTemp: 'ods'
    };

    const data = {};
    data.currentDate = currentDate;
    data.stockValuations = stockValuations.map(({ ticker, date, data }) => ({ 
      ticker, 
      date, 
      ...data, 
      active: data.active ? "ДА" : "НЕТ", 
      fairPrice: data.fairPrice.toString().replace(".", ",") 
    }));

    return await this.documentRenderer.render(
      'tickers',
      data,
      renderOptions
    );
  }

  schema() {}
}
