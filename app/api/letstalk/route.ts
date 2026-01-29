import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    const {
      companyName,
      industry,
      companyDescription,
      websiteUrl,
      landingGoal,
      ctaAction,
      campaignContext,
      mainMessage,
      keyBenefits,
      existingCopy,
      pricingHighlight,
      imageNotes,
      videoUrl,
      referenceUrls,
      brandColors,
      logoInfo,
      domain,
      hosting,
      languages,
      preferredContact,
      additionalNotes,
    } = formData;

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Validáció
    if (!companyName || !landingGoal || !mainMessage) {
      return NextResponse.json(
        { error: 'Hiányzó kötelező mezők (cégnév, cél, fő üzenet)' },
        { status: 400 }
      );
    }

    const section = (title: string, fields: { label: string; value: string | undefined }[]) => {
      const filledFields = fields.filter((f) => f.value);
      if (filledFields.length === 0) return '';
      return `
        <div style="margin-bottom: 30px;">
          <h2 style="color: #1e5f74; font-size: 18px; border-bottom: 2px solid #14b886; padding-bottom: 8px; margin-bottom: 15px;">${title}</h2>
          ${filledFields
            .map(
              (f) => `
            <div style="margin-bottom: 12px;">
              <span style="font-weight: bold; color: #1e5f74; display: block; margin-bottom: 4px;">${f.label}:</span>
              <span style="color: #555; white-space: pre-wrap;">${f.value}</span>
            </div>
          `
            )
            .join('')}
        </div>
      `;
    };

    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #1e5f74 0%, #14b886 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="margin: 0; font-size: 24px;">Projekt kérdőív beérkezett 📋</h1>
              <p style="margin: 10px 0 0; opacity: 0.9; font-size: 16px;">${companyName}</p>
            </div>
            <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
              ${section('1. Cég / Megrendelő', [
                { label: 'Cégnév / Márkanév', value: companyName },
                { label: 'Tevékenység / Iparág', value: industry },
                { label: 'Rövid leírás', value: companyDescription },
                { label: 'Weboldal / Social', value: websiteUrl },
              ])}
              ${section('2. A landing célja', [
                { label: 'Cél', value: landingGoal },
                { label: 'Konkrét CTA akció', value: ctaAction },
                { label: 'Kampány / esemény kontextus', value: campaignContext },
              ])}
              ${section('3. Tartalom', [
                { label: 'Fő üzenet / ötlet', value: mainMessage },
                { label: '3-5 fő előny', value: keyBenefits },
                { label: 'Kész szöveg', value: existingCopy },
                { label: 'Ár / ajánlat kiemelés', value: pricingHighlight },
                { label: 'Képek megjegyzés', value: imageNotes },
                { label: 'Videó / külső link', value: videoUrl },
              ])}
              ${section('4. Design / Stílus', [
                { label: 'Referencia oldalak', value: referenceUrls },
                { label: 'Színek / Brand', value: brandColors },
                { label: 'Logó info', value: logoInfo },
              ])}
              ${section('5. Technikai / Üzleti', [
                { label: 'Domain', value: domain },
                { label: 'Tárhely', value: hosting },
                { label: 'Nyelvi igények', value: languages },
              ])}
              ${section('6. Kommunikáció', [
                { label: 'Preferált kapcsolat', value: preferredContact },
                { label: 'Egyéb megjegyzés', value: additionalNotes },
              ])}
              <p style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #eee; color: #888; font-size: 13px;">
                Ez az email a brillcode.hu/letstalk kérdőívből érkezett.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    const fromEmail = process.env.FROM_EMAIL || 'BrillCode <onboarding@resend.dev>';
    const adminEmail = process.env.ADMIN_EMAIL || 'talk@brillcode.hu';

    const result = await resend.emails.send({
      from: fromEmail,
      to: adminEmail,
      subject: `Projekt kérdőív: ${companyName}`,
      html: adminEmailHtml,
    });

    if (result.error) {
      console.error('Letstalk email error:', result.error);
      return NextResponse.json(
        { error: 'Hiba történt az email küldése során' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Kérdőív sikeresen elküldve', success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('Letstalk API error:', error);
    return NextResponse.json(
      { error: 'Hiba történt a kérdőív feldolgozása során' },
      { status: 500 }
    );
  }
}
