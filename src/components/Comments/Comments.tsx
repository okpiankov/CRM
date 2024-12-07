import "./Comments.scss";
import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { DB } from "../../../utils/appwrite";
import {
  DB_ID,
  COLLECTION_COMMENTS,
  COLLECTION_DEALS,
} from "../../../utils/app.constants";

export const Comments = () => {
  const [isLoading, setIsLoading] = useState(false);

  type TypeComment = {
    text: string;
    deal: string;
  };
  // id буду получать из стора
  const cardId = "6753194e002e3901881b";
  const [formData, setFormData] = useState<TypeComment>({
    text: "",
    deal: cardId,
  });
  console.log(formData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [newComment, setNewComment] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const createComment = async () => {
      setIsLoading(true);
      try {
        const response = await DB.createDocument(
          DB_ID,
          COLLECTION_COMMENTS,
          uuid(),
          formData
        );
        // console.log(response);
        setNewComment(response.text);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
        // navigate("/");
        // location.reload();
      }
    };
    createComment();
  };

  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getComments = async () => {
      setIsLoading(true);
      try {
        const comments = await DB.getDocument(DB_ID, COLLECTION_DEALS, cardId);
        console.log(comments);
        setComments(comments.comments);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getComments();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit} noValidate>
        <textarea
          onChange={handleChange}
          value={formData.text}
          name="text"
          placeholder="Оставить комментарий"
        ></textarea>
        <button type="submit">{isLoading ? "Загрузка..." : "Отправить"}</button>
      </form>

      <div className="commentsBox">
        {newComment && (
          <div className="comment">
            <div>Комментарий: 25 ноября 2024</div>
            {newComment}
          </div>
        )}
        {comments?.map((comment) => (
          <div className="comment">
            <div>Комментарий: 25 ноября 2024</div>
            {comment.text}
          </div>
        ))}
      </div>
    </>
  );
};
