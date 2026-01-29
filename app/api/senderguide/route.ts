import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, to } = body;

    if (!url || typeof url !== 'string' || !url.trim()) {
      return NextResponse.json(
        { error: 'A kész oldal webcíme kötelező.' },
        { status: 400 }
      );
    }

    const trimmedUrl = url.trim();
    if (!/^https?:\/\//i.test(trimmedUrl)) {
      return NextResponse.json(
        { error: 'Érvényes URL-t adj meg (pl. https://...).' },
        { status: 400 }
      );
    }

    if (!to || typeof to !== 'string' || !to.trim()) {
      return NextResponse.json(
        { error: 'A címzett email címe kötelező.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to.trim())) {
      return NextResponse.json(
        { error: 'Érvényes email címet adj meg.' },
        { status: 400 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'Email szolgáltatás nincs konfigurálva.' },
        { status: 500 }
      );
    }

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #1e5f74 0%, #14b886 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="margin: 0; font-size: 24px;">Weboldalad első verziója kész 🎉</h1>
            </div>
            <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
              <p>Szia!</p>

              <p>Elkészült az oldalad <strong>első előnézete</strong>. Megnézheted az alábbi linken, és várjuk a javítandó részeket.</p>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${trimmedUrl}" style="display: inline-block; background: linear-gradient(135deg, #14b886 0%, #a3e635 100%); color: #1e5f74; font-weight: bold; padding: 16px 40px; border-radius: 12px; text-decoration: none; font-size: 16px;">
                  Megtekintem a weboldalam
                </a>
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

              <p style="margin-top: 20px; color: #666; font-size: 14px;">
                Üdvözlettel,<br>
                <strong>BrillCode – Tamás</strong>
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    const fromEmail = process.env.FROM_EMAIL || 'BrillCode <talk@brillcode.hu>';

    const result = await resend.emails.send({
      from: fromEmail,
      to: to.trim(),
      subject: 'Weboldalad első verziója kész – BrillCode',
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
