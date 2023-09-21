import { ReactNode } from "react"
import { useTranslation } from 'react-i18next';
import Groups from "./Groups"
import Search from "./Search"
import Tags from "./Tags"
import Navbar from "../Navbar"
import Sort from "./Sort";

const PageWrapper = ({ children, isFull }: 
    { children: ReactNode, isFull?: boolean } ) => {
    const { t } = useTranslation();

    return (
    <>
      <Navbar />
      <div className="container">
      <div className="row d-flex flex-row-reverse">
        {isFull && 
          <Sort />
        }
          <div className="col-lg-4">
              <div className="card mb-4">
                  <div className="card-header">{t('search')}</div>
                  <div className="card-body">
                    <Search />
                  </div>
              </div>
              {isFull && 
                <>
                    <div className="card mb-4">
                        <div className="card-header">{t('groups')}</div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-12">
                                    <Groups />
                                </div>
                            </div>
                        </div>
                    </div>
                    <Tags />
                </>
              }
          </div>
          { children }
      </div>
    </div>
    </>
    )
}
  
export default PageWrapper
  