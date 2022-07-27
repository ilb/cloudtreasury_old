import { spawnSync } from 'child_process';

export default class StockValuationService {
  constructor({stockValuationPath}) {
    this.stockValuationPath = stockValuationPath;
  }

  valuate(tickerInfo) {
    const data = spawnSync('python', [`fairpricecalc`], {
      argv0: 'PYTHONUTF8=1',
      cwd: this.stockValuationPath,
      input: JSON.stringify(tickerInfo),
      encoding: 'utf8'
    });

    if (!data.status) {
      return JSON.parse(data.stdout);
    } else {
      throw data.stderr;
    }
  }
}
