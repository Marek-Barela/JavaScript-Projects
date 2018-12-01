const MSGS = {
  INPUT_UPDATE: "INPUT_UPDATE",
  ADD_ITEM: "ADD_ITEM",
  DELETE_ITEM: "DELETE_ITEM"
}

export const inputValueAction = (formInputValue) => {
  return {
    type: MSGS.INPUT_UPDATE,
    formInputValue
  }
}

export const createItemAction = {
  type: MSGS.ADD_ITEM
}

export const deleteItemAction = (id) => {
  return {
    type: MSGS.DELETE_ITEM,
    id
  }
}

const addItem = (model) => {
  const {
    formInputValue
  } = model;
  const item = {
    id: Date.now(),
    value: formInputValue
  }
  const shoppingList = [...model.shoppingList, item]
  return {
    ...model,
    shoppingList,
    formInputValue: ""
  }
}

const deleteItem = (id, model) => {
  return model.shoppingList.filter(item => {
    return id !== item.id
  })
}

const update = (msg, model) => {
  switch (msg.type) {
    case MSGS.INPUT_UPDATE:
      const {
        formInputValue
      } = msg; {
        return { ...model,
          formInputValue
        }
      }

    case MSGS.ADD_ITEM:
      return addItem(model)

    case MSGS.DELETE_ITEM:
      const {
        id
      } = msg;
      const shoppingList = deleteItem(id, model)
      return {
        ...model,
        shoppingList
      }

    default:
      return {
        ...model
      }
  }
}

export default update;