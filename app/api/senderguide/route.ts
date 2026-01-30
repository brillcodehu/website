import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const VALID_TYPES = ['first_view', 'product_ready', 'complete'] as const;
type EmailType = (typeof VALID_TYPES)[number];

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function validateEmail(to: string): string | null {
  if (!to || typeof to !== 'string' || !to.trim()) return null;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(to.trim()) ? to.trim() : null;
}

function validateUrl(u: string): string | null {
  if (!u || typeof u !== 'string' || !u.trim()) return null;
  return /^https?:\/\//i.test(u.trim()) ? u.trim() : null;
}

function buildFirstViewHtml(url: string): string {
  const safeUrl = escapeHtml(url);
  return `
    <!DOCTYPE html>
    <html>
      <head><meta charset="utf-8"></head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1e5f74 0%, #14b886 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">Weboldalad első verziója kész 🎉</h1>
          </div>
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <p>Szia!</p>
            <p>Elkészült az oldalad <strong>első előnézete</strong>. Megnézheted az alábbi linken, és várjuk a javítandó részeket.</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${safeUrl}" style="display: inline-block; background: linear-gradient(135deg, #14b886 0%, #a3e635 100%); color: #1e5f74; font-weight: bold; padding: 16px 40px; border-radius: 12px; text-decoration: none; font-size: 16px;">Megtekintem a weboldalam</a>
            </div>
            <p><strong>Fontos:</strong> Néhány részt információ hiányában mi egészítettünk ki. Ha valami nem stimmel, jelezd nyugodtan – mindent módosítunk.</p>
            <p><strong>Kérjük, egy válaszemailben küldd el a módosítandókat</strong> – minél részletesebben (pl. „a Hero szekció címe legyen…”, „ezt a szöveget cseréld ki…”). Így gyorsan és pontosan tudjuk javítani.</p>
            <p>Érdekelne még: <strong>hogyan szeretnéd felhasználni a kapott weboldalt?</strong></p>
            <ul style="color: #555; margin: 10px 0 20px 20px;">
              <li>Statikus oldal (feltöltöd egy tárhelyre)</li>
              <li>WordPress oldalként</li>
              <li>Más CMS (pl. Webnode, Wix, stb.)</li>
              <li>Még nem tudom</li>
              <li>Teljes domain + tárhely szolgáltatással kérném</li>
            </ul>
            <p>Ezt is írd meg a válaszodban, ha van elképzelésed – így tudunk segíteni a következő lépésben is.</p>
            <p style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #eee;">
              Ha bármi kérdésed van, írj: <a href="mailto:talk@brillcode.hu" style="color: #14b886;">talk@brillcode.hu</a><br>
              Vagy hívj: <a href="tel:+36301794259" style="color: #14b886;">+36 30 179 4259</a>
            </p>
            <p style="margin-top: 20px; color: #666; font-size: 14px;">Üdvözlettel,<br><strong>BrillCode – Tamás</strong></p>
          </div>
        </div>
      </body>
    </html>
  `;
}

function formatHuf(n: number): string {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

type ProductReadyItem = { label: string; amount: number };

function buildProductReadyHtml(url: string, projektneve: string, items: ProductReadyItem[]): string {
  const safeUrl = escapeHtml(url);
  const safeProjekt = escapeHtml(projektneve);
  const total = items.reduce((sum, i) => sum + i.amount, 0);
  const itemsRows = items
    .map(
      (i) =>
        `<p style="margin: 4px 0;">${escapeHtml(i.label)} – ${formatHuf(i.amount)} Ft</p>`
    )
    .join('');
  return `
    <!DOCTYPE html>
    <html>
      <head><meta charset="utf-8"></head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1e5f74 0%, #14b886 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">Weboldalad elkészült</h1>
          </div>
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <p>Szia!</p>
            <p>Küldjük a <strong>kész verziót</strong> – kérjük, vess rá egy pillantást az alábbi linken.</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${safeUrl}" style="display: inline-block; background: linear-gradient(135deg, #14b886 0%, #a3e635 100%); color: #1e5f74; font-weight: bold; padding: 16px 40px; border-radius: 12px; text-decoration: none; font-size: 16px;">Megtekintem a weboldalam</a>
            </div>
            <p><strong>Fontos:</strong> Az oldal, amit most látsz, csak előnézethez elérhető, és hamarosan törlésre kerül. A tartalmat a kért formátumban (statikus, WordPress stb.) <strong>emailben megkapod fizetés után</strong>.</p>
            <p><strong>Fizetési adatok:</strong></p>
            <div style="background: #fff; border: 1px solid #ddd; border-radius: 8px; padding: 16px; margin: 16px 0;">
              <p style="margin: 4px 0;">Név: Vakarcs Tamás e.v.</p>
              <p style="margin: 4px 0;">Számlaszám: 10700196-56885288-51100005</p>
              ${itemsRows}
              <p style="margin: 8px 0 4px 0; font-weight: bold;">Fizetendő: ${formatHuf(total)} Ft</p>
              <p style="margin: 4px 0;">Közlemény: ${safeProjekt}</p>
            </div>
            <p style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #eee;">
              Ha bármi kérdésed van, írj: <a href="mailto:talk@brillcode.hu" style="color: #14b886;">talk@brillcode.hu</a><br>
              Vagy hívj: <a href="tel:+36301794259" style="color: #14b886;">+36 30 179 4259</a>
            </p>
            <p style="margin-top: 20px; color: #666; font-size: 14px;">Üdvözlettel,<br><strong>BrillCode – Tamás</strong></p>
          </div>
        </div>
      </body>
    </html>
  `;
}

function buildCompleteHtml(downloadLink: string, invoiceLink: string): string {
  const safeDownload = escapeHtml(downloadLink);
  const safeInvoice = escapeHtml(invoiceLink);
  return `
    <!DOCTYPE html>
    <html>
      <head><meta charset="utf-8"></head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1e5f74 0%, #14b886 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">Sikeres fizetés – köszönjük!</h1>
          </div>
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <p>Szia!</p>
            <p>Köszönjük a közös munkát – a fizetésedet feldolgoztuk. A weboldalad kódját most már letöltheted.</p>
            <p>Ha később marketing szolgáltatásra (SEO, hirdetések, tartalom) van szükséged, keress minket bátran.</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${safeDownload}" style="display: inline-block; background: linear-gradient(135deg, #14b886 0%, #a3e635 100%); color: #1e5f74; font-weight: bold; padding: 16px 32px; border-radius: 12px; text-decoration: none; font-size: 16px; margin: 0 8px 8px 0;">Weboldal letöltése</a>
              <a href="${safeInvoice}" style="display: inline-block; background: #1e5f74; color: white; font-weight: bold; padding: 16px 32px; border-radius: 12px; text-decoration: none; font-size: 16px; margin: 0 0 8px 8px;">Számla letöltése</a>
            </div>
            <p style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #eee;">
              Ha bármi kérdésed van, írj: <a href="mailto:talk@brillcode.hu" style="color: #14b886;">talk@brillcode.hu</a><br>
              Vagy hívj: <a href="tel:+36301794259" style="color: #14b886;">+36 30 179 4259</a>
            </p>
            <p style="margin-top: 20px; color: #666; font-size: 14px;">Üdvözlettel,<br><strong>BrillCode – Tamás</strong></p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, url, to, projektneve, downloadLink, invoiceLink, items: rawItems } = body;

    if (!VALID_TYPES.includes(type)) {
      return NextResponse.json(
        { error: 'Érvényes email típust válassz (first_view, product_ready, complete).' },
        { status: 400 }
      );
    }

    const emailTo = validateEmail(to ?? '');
    if (!emailTo) {
      return NextResponse.json(
        { error: 'Érvényes címzett email címet adj meg.' },
        { status: 400 }
      );
    }

    if (type === 'first_view') {
      const validUrl = validateUrl(url ?? '');
      if (!validUrl) {
        return NextResponse.json(
          { error: 'Érvényes kész oldal URL-t adj meg (pl. https://...).' },
          { status: 400 }
        );
      }
    }

    let productReadyItems: ProductReadyItem[] = [];
    if (type === 'product_ready') {
      const validUrl = validateUrl(url ?? '');
      if (!validUrl) {
        return NextResponse.json(
          { error: 'Érvényes kész oldal URL-t adj meg (pl. https://...).' },
          { status: 400 }
        );
      }
      const proj = typeof projektneve === 'string' && projektneve.trim() ? projektneve.trim() : null;
      if (!proj) {
        return NextResponse.json(
          { error: 'A projekt neve kötelező.' },
          { status: 400 }
        );
      }
      if (!Array.isArray(rawItems) || rawItems.length === 0) {
        return NextResponse.json(
          { error: 'Legalább egy tétel (megnevezés + ár) szükséges a Product ready emailhez.' },
          { status: 400 }
        );
      }
      for (let i = 0; i < rawItems.length; i++) {
        const row = rawItems[i];
        const label = typeof row?.label === 'string' ? row.label.trim() : '';
        const amount = typeof row?.amount === 'number' ? row.amount : Number(row?.amount);
        if (!label) {
          return NextResponse.json(
            { error: `A ${i + 1}. tétel megnevezése kötelező.` },
            { status: 400 }
          );
        }
        if (!Number.isFinite(amount) || amount < 0) {
          return NextResponse.json(
            { error: `A ${i + 1}. tétel ára érvényes szám legyen (Ft).` },
            { status: 400 }
          );
        }
        productReadyItems.push({ label, amount: Math.round(amount) });
      }
    }

    let completeDownloadLink: string | null = null;
    let completeInvoiceLink: string | null = null;
    if (type === 'complete') {
      completeDownloadLink = validateUrl(downloadLink ?? '');
      completeInvoiceLink = validateUrl(invoiceLink ?? '');
      if (!completeDownloadLink) {
        return NextResponse.json(
          { error: 'Érvényes weboldal letöltés linket adj meg.' },
          { status: 400 }
        );
      }
      if (!completeInvoiceLink) {
        return NextResponse.json(
          { error: 'Érvényes számla linket adj meg.' },
          { status: 400 }
        );
      }
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'Email szolgáltatás nincs konfigurálva.' },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const fromEmail = process.env.FROM_EMAIL || 'BrillCode <talk@brillcode.hu>';

    let subject: string;
    let html: string;

    if (type === 'first_view') {
      subject = 'Weboldalad első verziója kész – BrillCode';
      html = buildFirstViewHtml(validateUrl(url)!);
    } else if (type === 'product_ready') {
      subject = 'Weboldalad elkészült - BrillCode';
      const proj = (typeof projektneve === 'string' && projektneve.trim() ? projektneve.trim() : '') as string;
      html = buildProductReadyHtml(validateUrl(url)!, proj, productReadyItems);
    } else {
      subject = 'Sikeres fizetés - BrillCode';
      html = buildCompleteHtml(completeDownloadLink!, completeInvoiceLink!);
    }

    const result = await resend.emails.send({
      from: fromEmail,
      to: emailTo,
      subject,
      html,
    });

    if (result.error) {
      console.error('Senderguide email error:', result.error);
      return NextResponse.json(
        { error: 'Hiba történt az email küldése során.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Email sikeresen elküldve.', success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('Senderguide API error:', error);
    return NextResponse.json(
      { error: 'Hiba történt a küldés feldolgozása során.' },
      { status: 500 }
    );
  }
}
