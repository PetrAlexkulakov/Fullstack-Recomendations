import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom"
import Navbar from "../../components/Navbar";

const NotFound = () => {
  const { t } = useTranslation();
  
  return (
    <>
      <Navbar />
      <div className="container text-center py-5">
        <h1 className="display-1">404</h1>
        <p className="lead">{t('PageNotFound')}</p>
        <p>{t('SorryPNF')}</p>
        <Link to="/" className="btn btn-primary">{t('BackHome')}</Link>
      </div>
    </>
  )
}

export default NotFound
