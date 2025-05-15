import { useFetcher, useLocation } from "@remix-run/react"

export const LAST_UPDATED_DATE = new Date("07/11/2022").valueOf();

export default function CookieBanner() {
  const { pathname, search } = useLocation();
  const fetcher = useFetcher();

  return (
    <section className="cookie-banner">
      <h3>Diese Webseite verwendet Cookies.</h3>
      <p>
        Wir verwenden Cookies, um Inhalte und Anzeigen zu personalisieren, Funktionen für soziale Medien anbieten zu können und die Zugriffe auf unsere Website zu analysieren. 
        Außerdem geben wir Informationen zu Ihrer Verwendung unserer Website an unsere Partner für soziale Medien, Werbung und Analysen weiter.
        Unsere Partner führen diese Informationen möglicherweise mit weiteren Daten zusammen, die Sie ihnen bereitgestellt haben oder die sie im Rahmen Ihrer Nutzung der Dienste gesammelt haben. <a href="/impressum_datenschutz"> Zu den Datenschutzerklärungen</a>
      </p>
      <fetcher.Form method="POST" action="/hide_banner">
        <input type="hidden" name="redirectUrl" value={pathname + search} readOnly />
        <section className="flex jc-e">
        <button type="submit">
          Akzeptieren
        </button>
        </section>
      </fetcher.Form>
    </section>
  )
}