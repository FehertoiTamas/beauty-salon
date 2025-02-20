import SessionProviderWrapper from "../SessionProviderWrapper";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

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
  )
}
