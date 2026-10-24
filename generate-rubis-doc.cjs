const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  HeadingLevel, AlignmentType, BorderStyle, WidthType, ShadingType,
  PageBreak, Footer, Header, PageNumber, LevelFormat
} = require('docx');

const source = fs.readFileSync('rubis.md', 'utf8').replace(/\r/g, '');
const lines = source.split('\n');
const output = 'Chick Filler - Rubis Kakoba Mbarara Proposal.docx';
const green = '1D5B4F';
const dark = '17332F';
const gold = 'C9913D';
const grey = '5F6B68';
const light = 'EAF1EE';
const border = 'D5E0DB';

const noBorders = {
  top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
  bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
  left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
  right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
  insideHorizontal: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
  insideVertical: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
};

function cell(text, header = false) {
  return new TableCell({
    width: { size: header ? 28 : 72, type: WidthType.PERCENTAGE },
    shading: header ? { fill: green, type: ShadingType.CLEAR } : undefined,
    margins: { top: 100, bottom: 100, left: 120, right: 120 },
    children: [new Paragraph({
      spacing: { after: 0 },
      children: [new TextRun({ text: text.trim(), bold: header, color: header ? 'FFFFFF' : dark, size: 19 })]
    })]
  });
}

function makeTable(rows) {
  const widths = rows[0].length;
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 5, color: border },
      bottom: { style: BorderStyle.SINGLE, size: 5, color: border },
      left: { style: BorderStyle.SINGLE, size: 5, color: border },
      right: { style: BorderStyle.SINGLE, size: 5, color: border },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: border },
      insideVertical: { style: BorderStyle.SINGLE, size: 4, color: border },
    },
    rows: rows.map((row, index) => new TableRow({
      children: row.map((value) => cell(value, index === 0))
    }))
  });
}

function parseColumns(line) {
  return line.trim().split(/\s{2,}/).filter(Boolean);
}

function isTableStart(index) {
  const current = lines[index];
  const next = lines[index + 1] || '';
  return current.trim() && next.trim() && /\s{2,}/.test(current) && /\s{2,}/.test(next) && !current.trim().startsWith('*');
}

function bodyParagraph(text, options = {}) {
  return new Paragraph({
    style: options.style,
    alignment: options.alignment || AlignmentType.LEFT,
    spacing: { after: options.after ?? 130, line: 276 },
    indent: options.indent,
    children: [new TextRun({ text, font: 'Aptos', size: options.size || 21, color: options.color || dark, bold: options.bold || false })]
  });
}

const children = [];

// Cover page
children.push(new Paragraph({ spacing: { before: 900 }, children: [new TextRun({ text: 'CONFIDENTIAL', font: 'Aptos', size: 18, bold: true, color: gold })] }));
children.push(new Paragraph({ spacing: { before: 1700, after: 120 }, children: [new TextRun({ text: 'CHICK FILLER', font: 'Aptos Display', size: 50, bold: true, color: green })] }));
children.push(new Paragraph({ spacing: { after: 180 }, children: [new TextRun({ text: 'PARTNERSHIP PROPOSAL', font: 'Aptos', size: 28, bold: true, color: dark })] }));
children.push(new Paragraph({ spacing: { after: 500 }, children: [new TextRun({ text: 'Rubis Kakoba | Mbarara', font: 'Aptos', size: 29, color: gold, bold: true })] }));
children.push(new Paragraph({ border: { bottom: { style: BorderStyle.SINGLE, size: 18, color: green, space: 8 } }, spacing: { after: 420 }, children: [] }));
children.push(bodyParagraph('A quick-service chicken kiosk concept for the forecourt: fresh, affordable meals designed to make Rubis Kakoba a more convenient stop.', { size: 25, color: grey, after: 800 }));
children.push(new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, borders: noBorders, rows: [
  new TableRow({ children: [cell('PREPARED FOR', true), cell('Rubis Energy Uganda', false)] }),
  new TableRow({ children: [cell('PREPARED BY', true), cell('[Your Name] | [Phone] | [Email]', false)] }),
  new TableRow({ children: [cell('DATE', true), cell('September 2026', false)] }),
] }));
children.push(new Paragraph({ spacing: { before: 1700 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'PROPOSAL NO. 014', font: 'Aptos', size: 18, bold: true, color: grey })] }));
children.push(new Paragraph({ children: [new PageBreak()] }));

// Main content conversion
let index = 0;
while (index < lines.length) {
  const line = lines[index];
  const section = line.match(/^(\d{2})\s{2}(.+)$/);
  if (section) {
    children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 360, after: 180 }, keepNext: true,
      children: [new TextRun({ text: `${section[1]}  ${section[2]}`, font: 'Aptos Display', size: 30, bold: true, color: green })] }));
    index++;
    continue;
  }
  if (!line.trim()) { index++; continue; }
  if (isTableStart(index)) {
    const tableRows = [];
    while (index < lines.length && lines[index].trim() && /\s{2,}/.test(lines[index])) {
      tableRows.push(parseColumns(lines[index]));
      index++;
    }
    if (tableRows.length > 1) children.push(makeTable(tableRows));
    children.push(new Paragraph({ spacing: { after: 180 }, children: [] }));
    continue;
  }
  if (line.trim().startsWith('* ')) {
    children.push(new Paragraph({ bullet: { level: 0 }, spacing: { after: 70 }, children: [new TextRun({ text: line.trim().slice(2), font: 'Aptos', size: 20, color: dark })] }));
    index++;
    continue;
  }
  if (/^\d+\. /.test(line.trim())) {
    children.push(new Paragraph({ numbering: { reference: 'steps', level: 0 }, spacing: { after: 70 }, children: [new TextRun({ text: line.trim().replace(/^\d+\. /, ''), font: 'Aptos', size: 20, color: dark })] }));
    index++;
    continue;
  }
  if (/^[A-Z][A-Z &-]{3,}$/.test(line.trim()) || line.trim() === 'WHY KAKOBA, MBARARA') {
    children.push(new Paragraph({ spacing: { before: 230, after: 90 }, keepNext: true, children: [new TextRun({ text: line.trim(), font: 'Aptos', size: 20, bold: true, color: gold })] }));
    index++;
    continue;
  }
  children.push(bodyParagraph(line.trim()));
  index++;
}

const doc = new Document({
  creator: 'Chick Filler',
  title: 'Chick Filler Partnership Proposal - Rubis Kakoba Mbarara',
  description: 'Partnership proposal for a Chick Filler quick-service chicken outlet at Rubis Kakoba, Mbarara.',
  styles: {
    default: { document: { run: { font: 'Aptos', size: 21, color: dark }, paragraph: { spacing: { line: 276 } } } },
    paragraphStyles: [{ id: 'Normal', name: 'Normal', basedOn: 'Normal', next: 'Normal', run: { font: 'Aptos', size: 21, color: dark }, paragraph: { spacing: { after: 130, line: 276 } } }]
  },
  numbering: { config: [{ reference: 'steps', levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT }] }] },
  sections: [{
    page: { margin: { top: 720, right: 900, bottom: 720, left: 900 } },
    headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: 'CHICK FILLER  |  RUBIS KAKOBA', font: 'Aptos', size: 15, bold: true, color: grey })] })] }) },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'CONFIDENTIAL  |  ', font: 'Aptos', size: 15, color: grey }), new TextRun({ children: [PageNumber.CURRENT], font: 'Aptos', size: 15, color: grey })] })] }) },
    children
  }]
});

Packer.toBuffer(doc).then((buffer) => fs.writeFileSync(output, buffer));
