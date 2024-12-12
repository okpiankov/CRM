
// export function handleDragStart(card, column, setDragCard, setSourceColumn) {
//     console.log("handleDragStart", card);
//     setDragCard(card);
//     setSourceColumn(column);
//   }
//   console.log("dragCard", dragCard);
//   console.log("sourceColumn", sourceColumn);

//   //dragCard - id карточки приходящее с сервера, формат, например:  "67531a730002e6427f88",
//   //columnId или status - статус карточки куда нужно переместить , на выбор: "todo", "to-be-agreed", "in-progress", "produced"
// export const updateStatus = async (targetColumn) => {
//     console.log("updateStatus", dragCard);
//     setIsLoading(true);
//     try {
//       const data = await DB.updateDocument(DB_ID, COLLECTION_DEALS, dragCard, {
//         status: targetColumn,
//       });
//       console.log(data);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setIsLoading(false);
//       // navigate("/");
//       location.reload();
//     }
//   };

//   //targetColumn - куда хочу перенести те новый статус: "todo", "to-be-agreed", "in-progress", "produced"
// export function handleDrop(targetColumn) {
//     console.log("handleDrop", dragCard);
//     if (sourceColumn !== targetColumn) {
//       updateStatus(targetColumn);
//     }
//   }