import { render } from '../../../libs/utils/carbone.mjs';
import path from 'path';
import os from 'os';

export default class DocumentRenderer {
  constructor() {
    const mimeTypes = new Map();
    mimeTypes.set('pdf', 'application/pdf');
    mimeTypes.set('xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    mimeTypes.set('xls', 'application/vnd.ms-excel');
    mimeTypes.set('odt', 'application/vnd.oasis.opendocument.text');
    mimeTypes.set('ods', 'application/vnd.oasis.opendocument.spreadsheet');

    this.mimeTypes = mimeTypes;
    this.defaultOptions = {
      lang: 'ru',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      renderPath: path.join(os.tmpdir(), `carbone_render_${process.env.USER}`)
    };
    this.defautFormat = 'odt';
    this.defautTemplateFormat = 'odt';
    this.templateBase = process.env['apps.cloudtreasurytemplates.ws'];
  }

  async render(templateCode, data, renderOptions = {}) {
    const format = renderOptions.format || this.defautFormat;
    const formatTemp = renderOptions.formatTemp || this.defautTemplateFormat;
    const options = { ...this.defaultOptions };
    const contentType = this.mimeTypes.get(format);
    const basePath = this.templateBase.startsWith('file://')
      ? this.templateBase.substring(7)
      : this.templateBase;

    if (format != 'odt' || format != 'ods') {
      options.convertTo = format;
    }
    const templatePath = `${basePath}/templates/${templateCode}.${formatTemp}`;
    const content = await render(templatePath, data, options);
    const attachmentName = `${renderOptions.attachmentName || templateCode}.${format}`;
    return { content, contentType, attachmentName };
  }
}
