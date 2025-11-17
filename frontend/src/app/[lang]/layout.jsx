import { getDictionary } from './dictionaries';
import Initializer from './Initializer';
import '../globals.css';
export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tw' }];
}

export default async function AppLayout({ children, params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return <Initializer currentLang={dict}>{children}</Initializer>;
}
