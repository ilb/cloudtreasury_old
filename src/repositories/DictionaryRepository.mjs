export default class DictionaryRepository {
  constructor({ prisma }) {
    this.prisma = prisma;
  }

  async getDictionaries({ parentCode, code }) {
    return await this.prisma.dictionary.findMany({
      where: {
        parent: { code: parentCode },
        code
      }
    });
  }
}
