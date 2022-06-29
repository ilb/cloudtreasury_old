export default class GetDictionaries {
  constructor({ dictionaryRepository }) {
    this.dictionaryRepository = dictionaryRepository;
  }
  async process({ parentCode, code }) {
    const rows = await this.dictionaryRepository.getDictionaries({ parentCode, code });
    const result = rows.map(({ code, name }) => ({ code, name }));
    return result;
  }

  async schema() {
    return {
      type: 'object',
      properties: {
        parentCode: {
          title: 'Код родителя',
          type: 'string'
        },
        code: {
          title: 'Код',
          type: 'string'
        }
      },
      required: ['parentCode', 'code']
    };
  }
}
