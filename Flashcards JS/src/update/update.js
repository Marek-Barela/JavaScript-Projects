const MSGS = {
  CREATE_FLASHCARD: "CREATE_FLASHCARD",
  SAVE_FLASHCARD: "SAVE_FLASHCARD",
  EDIT_QUESTION: "EDIT_QUESTION",
  EDIT_ANSWER: "EDIT_ANSWER",
  DELETE_FLASHCARD: "DELETE_FLASHCARD",
  SHOW_ANSWER: "SHOW_ANSWER"
}


//Actions
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

export const deleteFlashcardAction = (id) => {
  return {
    type: MSGS.DELETE_FLASHCARD,
    id
  }
}

export const showFlashcardAnswerAction = (showAnswer, id) => {
  return {
    type: MSGS.SHOW_ANSWER,
    showAnswer,
    id
  }
}


// Return one element from array
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
    return [card.editMode = editMode, card.showAnswer = false]
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

const showFlashcardAnswer = (model, showAnswer, id) => {
  const {
    flashcards
  } = model;

  const cards = extractFlashcardId(flashcards, id)

  cards.map(card => {
    return card.showAnswer = showAnswer
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
          answer: "",
          showAnswer: false
        }
        const flashcards = [...model.flashcards, newFlashcard]
        return {
          ...model,
          flashcards
        }
      }
    case MSGS.DELETE_FLASHCARD:
      {
        const {
          flashcards
        } = model;
        const {
          id
        } = msg;
        const cards = flashcards.filter(flashcard => {
          return flashcard.id !== id
        })
        return {
          ...model,
          flashcards: cards
        }
      }
    case MSGS.SHOW_ANSWER:
      {
        const {
          showAnswer,
          id
        } = msg;
        return showFlashcardAnswer(model, showAnswer, id)
      }
    default:
      return {
        ...model
      }
  }
}

export default update;