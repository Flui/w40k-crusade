import { useTranslation } from "react-i18next";

export default function Root() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("Welcome to W40K Crusade")}</h1>
    </div>
  );
}
