import { ReactNode } from "react"
import Groups from "./Groups"
import Search from "./Search"
import Tags from "./Tags"
import Navbar from "../Navbar"
import Sort from "./Sort";

const PageWrapper = ({ children, isFull }: 
    { children: ReactNode, isFull?: boolean } ) => {
    const isSmall = window.innerWidth > 750 ? false : true;

    return (
    <>
      <Navbar />
      <div className="container accordion">
        <div className="row d-flex flex-row-reverse">
          {isFull && 
            <Sort />
          }
          <div className="col-lg-4">
            <Search isSmall={isSmall} />
            {isFull && 
              <>
                <Tags isSmall={isSmall} />
                <Groups isSmall={isSmall} />
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
  