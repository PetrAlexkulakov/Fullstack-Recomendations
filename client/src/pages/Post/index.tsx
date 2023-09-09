import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Post } from "../../interfaces/Post";
import axios from "axios";
import ReactMarkdown from 'react-markdown';
import { dataToString } from "../../shared/dataToString";
import PageWrapper from "../../components/PageWrapper";
import Likes from "../../components/Likes";
import Ratings from "../../components/Raitings";

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const baseURL = import.meta.env.VITE_REACT_APP_BACKEND_URL

  useEffect(() => {
    const fetchPost = async () => {
      const res = await (await axios.get(baseURL + '/posts/' + id)).data

      setPost(res);
    };
    fetchPost();
  }, [baseURL, id])

  return (
    <PageWrapper>
        <div className="col-lg-8">
            {post && 
                <article>
                    <header className="mb-4 d-flex flex-column align-items-center">
                        <h1 className="fw-bolder mb-1">Welcome to Blog Post!</h1>
                        <div className="d-flex justify-content-around gap-3 w-100">
                            <Ratings post={post} />
                            <div className="badge bg-secondary text-decoration-none link-light">{post.group}</div>
                            <div className="text-muted fst-italic mb-2">{dataToString(post.createdAt)}</div>
                        </div>
                    </header>
                    <figure className="mb-4"><img className="img-fluid rounded" src={post.imageURL} alt="..." /></figure>
                    <section className="mb-5" style={{textAlign: "left"}}>
                        {post.fullText.split('\n').map((paragraph, index) => (
                            <ReactMarkdown 
                                key={index} 
                                className="fs-5 mb-4"
                                children={paragraph} 
                            />
                        ))}
                    </section>
                    <div className="d-flex justify-content-around align-items-center gap-3">
                        <Ratings post={post} canChange={true} />
                        <div className="d-flex justify-content-around"><Likes post={post} /></div>
                    </div>
                </article> 
            }
            {/* <!-- Comments section-->
            <section className="mb-5">
                <div className="card bg-light">
                    <div className="card-body">
                        <!-- Comment form-->
                        <form className="mb-4"><textarea className="form-control" rows="3" placeholder="Join the discussion and leave a comment!"></textarea></form>
                        <!-- Comment with nested comments-->
                        <div className="d-flex mb-4">
                            <!-- Parent comment-->
                            <div className="flex-shrink-0"><img className="rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="..." /></div>
                            <div className="ms-3">
                                <div className="fw-bold">Commenter Name</div>
                                If you're going to lead a space frontier, it has to be government; it'll never be private enterprise. Because the space frontier is dangerous, and it's expensive, and it has unquantified risks.
                                <!-- Child comment 1-->
                                <div className="d-flex mt-4">
                                    <div className="flex-shrink-0"><img className="rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="..." /></div>
                                    <div className="ms-3">
                                        <div className="fw-bold">Commenter Name</div>
                                        And under those conditions, you cannot establish a capital-market evaluation of that enterprise. You can't get investors.
                                    </div>
                                </div>
                                <!-- Child comment 2-->
                                <div className="d-flex mt-4">
                                    <div className="flex-shrink-0"><img className="rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="..." /></div>
                                    <div className="ms-3">
                                        <div className="fw-bold">Commenter Name</div>
                                        When you put money directly to a problem, it makes a good headline.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Single comment-->
                        <div className="d-flex">
                            <div className="flex-shrink-0"><img className="rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="..." /></div>
                            <div className="ms-3">
                                <div className="fw-bold">Commenter Name</div>
                                When I look at the universe and all the ways the universe wants to kill us, I find it hard to reconcile that with statements of beneficence.
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
        </div>
    </PageWrapper>
  )
}

export default Post
