const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = __dirname;
const W = 1125, H = 675; // 300 DPI, 3.75 x 2.25 inches including bleed
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

const common = `
<defs>
  <style>
    .serif{font-family:Georgia,'Times New Roman',serif}.mono{font-family:Menlo,Consolas,monospace}
  </style>
</defs>
<rect x="38" y="38" width="1049" height="599" rx="2" fill="none" stroke="#d4a847" stroke-opacity=".62" stroke-width="3"/>
`;

const front = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">${common}
<line x1="270" y1="340" x2="855" y2="340" stroke="#d4a847" stroke-width="5"/>
<text x="247" y="293" class="mono" font-weight="700" font-size="64" fill="#7a9f5c">&lt;</text>
<text x="562" y="300" class="serif" text-anchor="middle" font-weight="700" font-size="112" letter-spacing="2" fill="#f5f0e8">mckbyte</text>
<text x="850" y="293" class="mono" font-weight="700" font-size="64" fill="#8ab4d6">/&gt;</text>
<text x="562" y="425" class="mono" text-anchor="middle" font-weight="700" font-size="25" letter-spacing="7" fill="#d4a847">SOFTWARE ENGINEER</text>
<text x="562" y="478" class="mono" text-anchor="middle" font-size="20" letter-spacing="5" fill="#b8a890">WEB · MOBILE · DESKTOP APPS</text>
</svg>`;

const back = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">${common}
<text x="105" y="190" class="serif" font-weight="700" font-size="70" fill="#f5f0e8">mckbyte</text>
<text x="107" y="242" class="mono" font-weight="700" font-size="24" letter-spacing="5" fill="#d4a847">MARK ESTELLA</text>
<line x1="106" y1="273" x2="530" y2="273" stroke="#d4a847" stroke-width="4"/>
<text x="106" y="355" class="mono" font-size="28" fill="#f5f0e8"><tspan fill="#b8a890">tel</tspan><tspan dx="42">0994 908 9775</tspan></text>
<text x="106" y="419" class="mono" font-size="25" fill="#f5f0e8"><tspan fill="#b8a890">email</tspan><tspan dx="24">${esc('mark.estella09@gmail.com')}</tspan></text>
<text x="106" y="483" class="mono" font-size="28" fill="#f5f0e8"><tspan fill="#b8a890">web</tspan><tspan dx="42">mckbyte.com</tspan></text>
<rect x="785" y="167" width="248" height="248" rx="4" fill="#f5f0e8"/>
<line x1="819" y1="449" x2="999" y2="449" stroke="#d4a847" stroke-width="2" stroke-opacity=".75"/>
<text x="909" y="483" class="mono" text-anchor="middle" font-size="16" letter-spacing="4" fill="#b8a890">SCAN TO SEE</text>
<text x="909" y="517" class="mono" text-anchor="middle" font-weight="700" font-size="19" letter-spacing="3" fill="#d4a847">SAMPLE PROJECTS</text>
</svg>`;

async function base() {
  return sharp(path.join(dir, 'mckbyte-card-texture.png')).resize(W, H, {fit:'cover'}).modulate({brightness:.72, saturation:.75}).png().toBuffer();
}

async function page(svg, out, withQR=false) {
  const overlays = [{input:Buffer.from(svg), top:0, left:0}];
  if (withQR) overlays.push({input:await sharp(path.join(dir,'mckbyte-website-qr.png')).resize(218,218,{kernel:'nearest'}).png().toBuffer(), left:800, top:182});
  await sharp(await base()).composite(overlays).jpeg({quality:96, chromaSubsampling:'4:4:4'}).toFile(out);
}

function makePDF(images, out) {
  const objs = [null];
  const add = (b) => (objs.push(Buffer.isBuffer(b)?b:Buffer.from(b,'binary')), objs.length-1);
  const catalog = add('');
  const pages = add('');
  const pageIds=[];
  images.forEach((imgPath,i) => {
    const img=fs.readFileSync(imgPath);
    const imageId=add(Buffer.concat([Buffer.from(`<< /Type /XObject /Subtype /Image /Width ${W} /Height ${H} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${img.length} >>\nstream\n`),img,Buffer.from('\nendstream')]));
    const stream=Buffer.from(`q 270 0 0 162 0 0 cm /Im${i} Do Q`);
    const contentId=add(Buffer.concat([Buffer.from(`<< /Length ${stream.length} >>\nstream\n`),stream,Buffer.from('\nendstream')]));
    pageIds.push(add(`<< /Type /Page /Parent ${pages} 0 R /MediaBox [0 0 270 162] /Resources << /XObject << /Im${i} ${imageId} 0 R >> >> /Contents ${contentId} 0 R >>`));
  });
  objs[catalog]=Buffer.from(`<< /Type /Catalog /Pages ${pages} 0 R >>`);
  objs[pages]=Buffer.from(`<< /Type /Pages /Kids [${pageIds.map(x=>x+' 0 R').join(' ')}] /Count ${pageIds.length} >>`);
  const chunks=[Buffer.from('%PDF-1.4\n%\xFF\xFF\xFF\xFF\n','binary')], offsets=[0]; let pos=chunks[0].length;
  for(let i=1;i<objs.length;i++){offsets[i]=pos; const b=Buffer.concat([Buffer.from(`${i} 0 obj\n`),objs[i],Buffer.from('\nendobj\n')]); chunks.push(b);pos+=b.length;}
  const xref=pos; let table=`xref\n0 ${objs.length}\n0000000000 65535 f \n`;
  for(let i=1;i<objs.length;i++) table+=String(offsets[i]).padStart(10,'0')+' 00000 n \n';
  chunks.push(Buffer.from(table+`trailer\n<< /Size ${objs.length} /Root ${catalog} 0 R >>\nstartxref\n${xref}\n%%EOF\n`));
  fs.writeFileSync(out,Buffer.concat(chunks));
}

(async()=>{
  const f=path.join(dir,'mckbyte-business-card-front.jpg'), b=path.join(dir,'mckbyte-business-card-back.jpg');
  await page(front,f); await page(back,b,true);
  makePDF([f,b],path.join(dir,'mckbyte-business-card-print.pdf'));
})().catch(e=>{console.error(e);process.exit(1)});
