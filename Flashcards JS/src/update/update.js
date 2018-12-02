const MSGS = {
  CREATE_FLASHCARD: "CREATE_FLASHCARD",
  SAVE_FLASHCARD: "SAVE_FLASHCARD",
  EDIT_QUESTION: "EDIT_QUESTION",
  EDIT_ANSWER: "EDIT_ANSWER"
}

export const saveFlashcardAction = (editMode, id) => {
  return {
    type: MSGS.SAVE_FLASHCARD,
    editMode,
    id
  }
}

export const editQuestionInputAction = (question, id) => {
  return {
    type: MSGS.EDIT_QUESTION,
    question,
    id
  }
}

export const editAnswerInputAction = (answer, id) => {
  return {
    type: MSGS.EDIT_ANSWER,
    answer,
    id
  }
}

export const createFlashcardAction = () => {
  return {
    type: MSGS.CREATE_FLASHCARD
  }
}

const extractFlashcardId = (flashcards, id) => {
  return flashcards.filter(flashcard => {
    return (flashcard.id === id)
  })
}

const saveFlashcard = (model, editMode, id) => {
  const {
    flashcards
  } = model;

  const cards = extractFlashcardId(flashcards, id)

  cards.map(card => {
    return card.editMode = editMode
  })

  return {
    ...model
  }
}

const editFlashcardQuestion = (model, question, id) => {
  const {
    flashcards
  } = model;

  const cards = extractFlashcardId(flashcards, id)

  cards.map(card => {
    return card.question = question
  })

  return {
    ...model
  }
}

const editFlashcardAnswer = (model, answer, id) => {
  const {
    flashcards
  } = model;

  const cards = extractFlashcardId(flashcards, id)

  cards.map(card => {
    return card.answer = answer
  })

  return {
    ...model
  }
}


const update = (msg, model) => {
  switch (msg.type) {
    case MSGS.SAVE_FLASHCARD:
      {
        const {
          editMode,
          id
        } = msg;
        return saveFlashcard(model, editMode, id)
      }

    case MSGS.EDIT_QUESTION:
      {
        const {
          question,
          id
        } = msg;
        return editFlashcardQuestion(model, question, id)
      }

    case MSGS.EDIT_ANSWER:
      {
        const {
          answer,
          id
        } = msg;
        return editFlashcardAnswer(model, answer, id)
      }

    case MSGS.CREATE_FLASHCARD:
      {
        const newFlashcard = {
          id: Date.now(),
          editMode: true,
          question: "",
          answer: ""
        }
        const flashcards = [...model.flashcards, newFlashcard]
        return {
          ...model,
          flashcards
        }
      }

    default:
      return {
        ...model
      }
  }
}

export default update;