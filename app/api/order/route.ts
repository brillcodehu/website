import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    const { name, email, phone, business, goal, style, notes } = formData;

    // Validáció
    if (!name || !email || !business || !goal) {
      return NextResponse.json(
        { error: 'Hiányzó kötelező mezők' },
        { status: 400 }
      );
    }

    // 1. Email neked (admin/ügyfél)
    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #1e5f74 0%, #14b886 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .field { margin-bottom: 20px; }
            .label { font-weight: bold; color: #1e5f74; margin-bottom: 5px; display: block; }
            .value { color: #555; }
            .highlight { background: #fff; padding: 15px; border-left: 4px solid #14b886; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Új megrendelés érkezett! 🎉</h1>
            </div>
            <div class="content">
              <p><strong>Új landing oldal megrendelés érkezett a BrillCode oldalról.</strong></p>
              
              <div class="highlight">
                <div class="field">
                  <span class="label">Név:</span>
                  <span class="value">${name}</span>
                </div>
                <div class="field">
                  <span class="label">Email:</span>
                  <span class="value">${email}</span>
                </div>
                ${phone ? `
                <div class="field">
                  <span class="label">Telefonszám:</span>
                  <span class="value">${phone}</span>
                </div>
                ` : ''}
                <div class="field">
                  <span class="label">Cégnév / Márkanév:</span>
                  <span class="value">${business}</span>
                </div>
                <div class="field">
                  <span class="label">Cél:</span>
                  <span class="value">${goal}</span>
                </div>
                ${style ? `
                <div class="field">
                  <span class="label">Stílus preferencia:</span>
                  <span class="value">${style}</span>
                </div>
                ` : ''}
                ${notes ? `
                <div class="field">
                  <span class="label">Megjegyzés:</span>
                  <span class="value">${notes}</span>
                </div>
                ` : ''}
              </div>

              <p style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #eee;">
                <strong>Következő lépések:</strong><br>
                1. Vedd fel a kapcsolatot az ügyféllel<br>
                2. Készítsd el a landing oldalt 24 órán belül<br>
                3. Küldd el a linket és a fizetési információt
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    // 2. Visszaigazoló email a jelentkezőnek
    const customerEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #1e5f74 0%, #14b886 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .highlight { background: #fff; padding: 20px; border-left: 4px solid #14b886; margin: 20px 0; }
            .steps { margin: 20px 0; }
            .step { margin: 15px 0; padding-left: 30px; position: relative; }
            .step::before { content: counter(step-counter); counter-increment: step-counter; position: absolute; left: 0; background: #14b886; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; }
            .steps { counter-reset: step-counter; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Köszönjük a megrendelést! 🎉</h1>
            </div>
            <div class="content">
              <p>Kedves <strong>${name}</strong>!</p>
              
              <p>Megkaptuk a megrendelésedet. Hamarosan felvesszük veled a kapcsolatot, és <strong>24 órán belül</strong> elkészül a landing oldalad.</p>

              <div class="highlight">
                <h3 style="margin-top: 0; color: #1e5f74;">Megrendelés részletei:</h3>
                <p><strong>Cégnév:</strong> ${business}</p>
                <p><strong>Cél:</strong> ${goal}</p>
                <p><strong>Ár:</strong> 9 400 Ft (egyszeri díj)</p>
              </div>

              <div class="steps">
                <h3 style="color: #1e5f74;">Mi történik most?</h3>
                <div class="step">Átnézzük az igényeidet és elkészítjük az egyedi landing oldalad</div>
                <div class="step">24 órán belül megkapod a kész oldalt e-mailben</div>
                <div class="step">Ha tetszik, kifizeted. Ha nem, akkor nem. Nincs kockázat!</div>
              </div>

              <p style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #eee;">
                Ha bármi kérdésed van, írj nekünk: <a href="mailto:talk@brillcode.hu" style="color: #14b886;">talk@brillcode.hu</a><br>
                Vagy hívj: <a href="tel:+36301794259" style="color: #14b886;">+36 30 179 4259</a>
              </p>

              <p style="margin-top: 20px; color: #666; font-size: 14px;">
                Üdvözlettel,<br>
                <strong>A BrillCode csapata</strong>
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Email küldése
    const fromEmail = process.env.FROM_EMAIL || 'BrillCode <onboarding@resend.dev>';
    const adminEmail = process.env.ADMIN_EMAIL || 'talk@brillcode.hu';

    const [adminResult, customerResult] = await Promise.all([
      // Admin email
      resend.emails.send({
        from: fromEmail,
        to: adminEmail,
        subject: `Új megrendelés: ${business} - ${name}`,
        html: adminEmailHtml,
      }),
      // Visszaigazoló email
      resend.emails.send({
        from: fromEmail,
        to: email,
        subject: 'Köszönjük a megrendelésedet! - BrillCode',
        html: customerEmailHtml,
      }),
    ]);

    if (adminResult.error || customerResult.error) {
      console.error('Email error:', adminResult.error || customerResult.error);
      return NextResponse.json(
        { error: 'Hiba történt az email küldése során' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Megrendelés sikeresen elküldve', success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Hiba történt a megrendelés feldolgozása során' },
      { status: 500 }
    );
  }
}
