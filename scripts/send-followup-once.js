/**
 * Egyszeri küldés: "Beszéljünk a projektről!" email a 3 címre.
 * Futtatás: node scripts/send-followup-once.js
 * (RESEND_API_KEY és FROM_EMAIL a .env.local-ból töltődik, vagy: RESEND_API_KEY=re_xxx node scripts/send-followup-once.js)
 * Használat után törölhető: scripts/send-followup-once.js
 */

const path = require('path');
const fs = require('fs');

// .env.local betöltése ha van (csak az első = jelnél vágunk, hogy a value tartalmazhat = és egyéb karaktereket)
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  content.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const eq = trimmed.indexOf('=');
      if (eq === -1) return;
      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'")))
        value = value.slice(1, -1);
      process.env[key] = value;
    }
  });
}

const { Resend } = require('resend');

const TO_EMAILS = [
  'themoodmates@gmail.com',
  'csizmadia.patrik@gmail.com',
  'brillcodehu@gmail.com',
];

const html = `
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
        <p>Sziasztok!</p>

        <p>Ahhoz, hogy a lehető legjobb landing oldalt készítsük el, szeretnénk kicsit jobban megismerni a projektedet.</p>

        <p>Összeállítottunk egy rövid kérdőívet, amivel pontosíthatod az elképzeléseidet – legyen szó a dizájnról, a tartalomról vagy a technikai részletekről.</p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="https://brillcode.hu/letstalk" style="display: inline-block; background: linear-gradient(135deg, #14b886 0%, #a3e635 100%); color: #1e5f74; font-weight: bold; padding: 16px 40px; border-radius: 12px; text-decoration: none; font-size: 16px;">
            Kérdőív kitöltése
          </a>
        </div>

        <p style="color: #666; font-size: 14px;">A kérdőív kitöltése nem kötelező, de sokat segít nekünk abban, hogy az oldal pontosan olyan legyen, amilyennek elképzelted.</p>

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

async function main() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('Hiányzik a RESEND_API_KEY. Futtasd: RESEND_API_KEY=re_xxx node scripts/send-followup-once.js');
    process.exit(1);
  }

  const fromEmail = process.env.FROM_EMAIL || 'BrillCode <talk@brillcode.hu>';
  const fromToUse = fromEmail.includes('brillcode.hu') ? fromEmail : 'BrillCode <talk@brillcode.hu>';
  const resend = new Resend(apiKey);

  console.log('From:', fromToUse);
  console.log('Küldés a 3 címre:', TO_EMAILS.join(', '));
  const { data, error } = await resend.emails.send({
    from: fromToUse,
    to: TO_EMAILS,
    subject: 'Beszéljünk a projektről! - BrillCode',
    html,
  });

  if (error) {
    console.error('Hiba:', error);
    process.exit(1);
  }
  console.log('Elküldve. Id:', data?.id);
}

main();
