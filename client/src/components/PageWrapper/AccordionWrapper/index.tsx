import { v4 as uuidv4 } from 'uuid';
import classes from './styles.module.scss'

const AccordionWrapper = ({ header, children }: { header: string, children: JSX.Element }) => {
  const uniqueKey = uuidv4();

  return (
    <div className='card mb-2 accordion-item'>
      <div className="card-header">
        <button 
          className={classes.accordionBtn + " accordion-button collapsed p-0"}
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target={`#panelsStayOpen-collapse${uniqueKey}`}
          aria-expanded="true" 
          aria-controls={`panelsStayOpen-collapse${uniqueKey}`}
          // style={{
          //   backgroundColor: 'rgba(0, 125, 215, 0)',
          //   // borderColor: 'rgba(0, 125, 215, 0)',
          //   // boxShadow: 'rgba(0, 125, 215, 0) !important',
          // }}
        >
          {header}
        </button>
      </div>
      <div id={`panelsStayOpen-collapse${uniqueKey}`} className="accordion-collapse collapse">
        <div className="accordion-body p-0">
          {children}
        </div>
      </div>
    </div>
  )
}
export default AccordionWrapper
