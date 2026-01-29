import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

function escapeHtml(s: string): string {
  if (!s) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    const { name, email, phone, business, goal, hasWebsite, notes } = formData;

    const resend = new Resend(process.env.RESEND_API_KEY);
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'Email szolgáltatás nincs konfigurálva' },
        { status: 500 }
      );
    }

    // Validáció
    if (!name || !email || !business || !goal) {
      return NextResponse.json(
        { error: 'Hiányzó kötelező mezők (név, email, cégnév, cél)' },
        { status: 400 }
      );
    }

    const safe = {
      name: escapeHtml(name),
      email: escapeHtml(email),
      phone: escapeHtml(phone || ''),
      business: escapeHtml(business),
      goal: escapeHtml(goal),
      hasWebsite: escapeHtml(hasWebsite || ''),
      notes: escapeHtml(notes || ''),
    };

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
                  <span class="value">${safe.name || '–'}</span>
                </div>
                <div class="field">
                  <span class="label">Email:</span>
                  <span class="value">${safe.email || '–'}</span>
                </div>
                <div class="field">
                  <span class="label">Telefonszám:</span>
                  <span class="value">${safe.phone || '–'}</span>
                </div>
                <div class="field">
                  <span class="label">Cégnév / Márkanév:</span>
                  <span class="value">${safe.business || '–'}</span>
                </div>
                <div class="field">
                  <span class="label">Mi a cél?:</span>
                  <span class="value">${safe.goal || '–'}</span>
                </div>
                <div class="field">
                  <span class="label">Van már weboldalad?:</span>
                  <span class="value">${safe.hasWebsite || '–'}</span>
                </div>
                <div class="field">
                  <span class="label">Bármi amit még tudnunk kell:</span>
                  <span class="value">${safe.notes ? safe.notes.replace(/\n/g, '<br>') : '–'}</span>
                </div>
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
              <p>Kedves <strong>${safe.name}</strong>!</p>
              
              <p>Megkaptuk a megrendelésedet. Hamarosan felvesszük veled a kapcsolatot, és <strong>24 órán belül</strong> elkészül a landing oldalad.</p>

              <div class="highlight">
                <h3 style="margin-top: 0; color: #1e5f74;">Megrendelés részletei:</h3>
                <p><strong>Cégnév:</strong> ${safe.business}</p>
                <p><strong>Cél:</strong> ${safe.goal}</p>
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

    // 3. Follow-up email: "Beszéljünk a projektről!"
    const followUpEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #1e5f74 0%, #14b886 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="margin: 0; font-size: 24px;">Beszéljünk a projektről! 💬</h1>
            </div>
            <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
              <p>Kedves <strong>${safe.name}</strong>!</p>

              <p>Köszönjük a megrendelésedet! Ahhoz, hogy a lehető legjobb landing oldalt készítsük el neked, szeretnénk kicsit jobban megismerni a projektedet.</p>

              <p>Összeállítottunk egy rövid kérdőívet, amivel pontosíthatod az elképzeléseidet – legyen szó a dizájnról, a tartalomról vagy a technikai részletekről.</p>

              <div style="text-align: center; margin: 30px 0;">
                <a href="https://brillcode.hu/letstalk" style="display: inline-block; background: linear-gradient(135deg, #14b886 0%, #a3e635 100%); color: #1e5f74; font-weight: bold; padding: 16px 40px; border-radius: 12px; text-decoration: none; font-size: 16px;">
                  Kérdőív kitöltése
                </a>
              </div>

              <p style="color: #666; font-size: 14px;">A kérdőív kitöltése nem kötelező, de sokat segít nekünk abban, hogy az oldalad pontosan olyan legyen, amilyennek elképzelted.</p>

              <p style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #eee;">
                Ha bármi kérdésed van, írj nekünk: <a href="mailto:talk@brillcode.hu" style="color: #14b886;">talk@brillcode.hu</a><br>
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
    const adminFromEmail = process.env.ADMIN_FROM_EMAIL || 'BrillCode <boss@brillcode.hu>';
    const adminTo = process.env.ADMIN_EMAIL || 'talk@brillcode.hu';

    // Admin email: először boss@-ról, ha Resend hibát ad (pl. nincs verified), talk@-ról
    let adminResult = await resend.emails.send({
      from: adminFromEmail,
      to: adminTo,
      subject: `Új megrendelés: ${safe.business} - ${safe.name}`,
      html: adminEmailHtml,
    });
    if (adminResult.error) {
      adminResult = await resend.emails.send({
        from: fromEmail,
        to: adminTo,
        subject: `Új megrendelés: ${safe.business} - ${safe.name}`,
        html: adminEmailHtml,
      });
    }

    const [customerResult, followUpResult] = await Promise.all([
      resend.emails.send({
        from: fromEmail,
        to: email,
        subject: 'Köszönjük a megrendelésedet! - BrillCode',
        html: customerEmailHtml,
      }),
      resend.emails.send({
        from: fromEmail,
        to: email,
        subject: 'Beszéljünk a projektről! - BrillCode',
        html: followUpEmailHtml,
      }),
    ]);

    if (adminResult.error || customerResult.error || followUpResult.error) {
      console.error('Email error:', {
        admin: adminResult.error,
        customer: customerResult.error,
        followUp: followUpResult.error,
      });
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
