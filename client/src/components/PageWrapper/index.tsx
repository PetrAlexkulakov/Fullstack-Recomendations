const PageWrapper = ({ children }: React.PropsWithChildren ) => {
    return (
      <div className="container">
      <div className="row">
        { children }
          {/* <!-- Side widgets--> */}
          <div className="col-lg-4">
              {/* <!-- Search widget--> */}
              <div className="card mb-4">
                  <div className="card-header">Search</div>
                  <div className="card-body">
                      <div className="input-group">
                          <input className="form-control" type="text" placeholder="Enter search term..." aria-label="Enter search term..." aria-describedby="button-search" />
                          <button className="btn btn-primary" id="button-search" type="button">Go!</button>
                      </div>
                  </div>
              </div>
              {/* <!-- Groups widget--> */}
              <div className="card mb-4">
                  <div className="card-header">Groups</div>
                  <div className="card-body">
                      <div className="row">
                          <div className="col-sm-12">
                              <ul className="list-unstyled mb-0">
                                  <li><a href="?group=film">Film</a></li>
                                  <li><a href="?group=game">Game</a></li>
                                  <li><a href="?group=book">Book</a></li>
                                  <li><a href="?">Any</a></li>
                              </ul>
                          </div>
                      </div>
                  </div>
              </div>
              {/* <!-- Side widget--> */}
              <div className="card mb-4">
                  <div className="card-header">Side Widget</div>
                  <div className="card-body">You can put anything you want inside of these side widgets. They are easy to use, and feature the Bootstrap 5 card component!</div>
              </div>
          </div>
      </div>
  </div>
    )
}
  
export default PageWrapper
  