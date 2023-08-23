import PageWrapper from "../../components/PageWrapper"

const Main = () => {
  return (
    <PageWrapper>
        <div className="col-lg-8">
            {/* <!-- Featured blog post--> */}
            <div className="card mb-4">
                <a href="#!"><img className="card-img-top" src="https://dummyimage.com/850x350/dee2e6/6c757d.jpg" alt="..." /></a>
                <div className="card-body">
                    <div className="small text-muted">January 1, 2023</div>
                    <h2 className="card-title">Featured Post Title</h2>
                    <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque, nulla? Quos cum ex quis soluta, a laboriosam. Dicta expedita corporis animi vero voluptate voluptatibus possimus, veniam magni quis!</p>
                    <a className="btn btn-primary" href="#!">Read more →</a>
                </div>
            </div>
            {/* <!-- Nested row for non-featured blog posts--> */}
            <div className="row">
                <div className="col-lg-6">
                    {/* <!-- Blog post--> */}
                    <div className="card mb-4">
                        <a href="#!"><img className="card-img-top" src="https://dummyimage.com/700x350/dee2e6/6c757d.jpg" alt="..." /></a>
                        <div className="card-body">
                            <div className="small text-muted">January 1, 2023</div>
                            <h2 className="card-title h4">Post Title</h2>
                            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque, nulla.</p>
                            <a className="btn btn-primary" href="#!">Read more →</a>
                        </div>
                    </div>
                    {/* <!-- Blog post--> */}
                    <div className="card mb-4">
                        <a href="#!"><img className="card-img-top" src="https://dummyimage.com/700x350/dee2e6/6c757d.jpg" alt="..." /></a>
                        <div className="card-body">
                            <div className="small text-muted">January 1, 2023</div>
                            <h2 className="card-title h4">Post Title</h2>
                            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque, nulla.</p>
                            <a className="btn btn-primary" href="#!">Read more →</a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    {/* <!-- Blog post--> */}
                    <div className="card mb-4">
                        <a href="#!"><img className="card-img-top" src="https://dummyimage.com/700x350/dee2e6/6c757d.jpg" alt="..." /></a>
                        <div className="card-body">
                            <div className="small text-muted">January 1, 2023</div>
                            <h2 className="card-title h4">Post Title</h2>
                            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque, nulla.</p>
                            <a className="btn btn-primary" href="#!">Read more →</a>
                        </div>
                    </div>
                    {/* <!-- Blog post--> */}
                    <div className="card mb-4">
                        <a href="#!"><img className="card-img-top" src="https://dummyimage.com/700x350/dee2e6/6c757d.jpg" alt="..." /></a>
                        <div className="card-body">
                            <div className="small text-muted">January 1, 2023</div>
                            <h2 className="card-title h4">Post Title</h2>
                            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque, nulla? Quos cum ex quis soluta, a laboriosam.</p>
                            <a className="btn btn-primary" href="#!">Read more →</a>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Pagination--> */}
            <nav aria-label="Pagination">
                <hr className="my-0" />
                <ul className="pagination justify-content-center my-4">
                    <li className="page-item disabled"><a className="page-link" href="#" aria-disabled="true">Newer</a></li>
                    <li className="page-item active" aria-current="page"><a className="page-link" href="#!">1</a></li>
                    <li className="page-item"><a className="page-link" href="#!">2</a></li>
                    <li className="page-item"><a className="page-link" href="#!">3</a></li>
                    <li className="page-item disabled"><a className="page-link" href="#!">...</a></li>
                    <li className="page-item"><a className="page-link" href="#!">15</a></li>
                    <li className="page-item"><a className="page-link" href="#!">Older</a></li>
                </ul>
            </nav>
        </div>
    </PageWrapper>
  )
}

export default Main
