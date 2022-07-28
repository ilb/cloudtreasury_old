import { spawnSync } from 'child_process';

export default class StockValuationService {
  constructor({stockValuationPath}) {
    this.stockValuationPath = stockValuationPath;
  }

  valuate(tickerInfo) {
    const data = spawnSync('python3.7', [`fairpricecalc`], {
      argv0: 'PYTHONUTF8=1',
      env: {'ru.bystrobank.apps.stockvaluation.securitiesrefurl':'https://ilb.github.io/stockvaluation/securities.xhtml'},
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
