import "./Comments.scss";
import { useState, useEffect, useContext, ChangeEvent, FormEvent } from "react";
import { v4 as uuid } from "uuid";
import { DB } from "../../../utils/appwrite";
import {
  DB_ID,
  COLLECTION_COMMENTS,
  COLLECTION_DEALS,
} from "../../../utils/app.constants";
import { ContextDeal } from "../../App";
import dayjs from "dayjs";

export const Comments = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { cardId } = useContext(ContextDeal);

  type TypeCommentSend = {
    text: string;
    deal: string;
  };
  //initialState для отправки формы комментария
  const initialState = {
    text: "",
    deal: cardId,
  }

  // id буду получать из стора пример cardId ="6753194e002e3901881b";
  const [formData, setFormData] = useState<TypeCommentSend>({ ...initialState });
  // console.log(formData);

// Функция для очистки формы после отправки
function resetForm() {
  Object.assign(formData, initialState)
}

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  type TypeCommentGet = {
    text: string;
    $createdAt: string;
  };
  //Получение нового комментария сразу после создания:
  const [newComment, setNewComment] = useState<TypeCommentGet>({
    text: "",
    $createdAt: "",
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //Создание комментария
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
        setNewComment(response);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
        resetForm()
      }
    };
    createComment();
  };

  type TypeCommentsGet = {
    text: string;
    $createdAt: string;
    $id: string;
  };
  //Получение ВСЕХ комментариев
  const [comments, setComments] = useState<TypeCommentsGet[]>([
    {
      text: "",
      $createdAt: "",
      $id: "",
    },
  ]);

  //Получение ВСЕХ комментариев
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
  }, [newComment, cardId]);

  return (
    <>
      <form onSubmit={handleSubmit} noValidate>
        <textarea
          onChange={handleChange}
          value={formData.text}
          name="text"
          placeholder="Оставить комментарий"
        ></textarea>
        <button  type="submit">{isLoading ? "Загрузка..." : "Сохранить"}</button>
      </form>

      <div className="commentsBox">
        {/* Получение нового комментария сразу после создания: */}
        {newComment.text !=='' || newComment.$createdAt !== "" && (
          <div className="comment">
            <div>Комментарий: {dayjs(newComment.$createdAt).format("DD MMMM YYYY")} </div>
            {newComment.text}
          </div>
        )}
        {/* Получение ВСЕХ комментариев: */}
        {comments.length >0 && comments?.map((comment) => (
          <div key={comment.$id} className="comment">
            <div>
              Комментарий: {dayjs(comment.$createdAt).format("DD MMMM YYYY")}
            </div>
            {comment.text}
          </div>
        ))}
      </div>
    </>
  );
};
