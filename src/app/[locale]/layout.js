import "./globals.css";
import SessionProviderWrapper from "../[locale]/SessionProviderWrapper";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';


export async function generateMetadata({ params }) {
  // Aszinkron módon kinyerjük a locale paramétert
  const locale = await params;

  // Üzenetek betöltése a megfelelő nyelven
  const messages = await getMessages(locale);

  // A cím és egyéb metaadatok beállítása
  const title = (messages?.Home?.title) || "Default Title";
  const description = "safdsafdasfd"

  return {
    title: title,
    description: description
  };
}


export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  const messages = await getMessages(locale);

  return (

    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <SessionProviderWrapper>{children}</SessionProviderWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
