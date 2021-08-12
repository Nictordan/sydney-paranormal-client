export const handleCurrentPin = (event, dispatch) => {
    dispatch({
      type:"setPin",
      data: event.properties.id
    })
}