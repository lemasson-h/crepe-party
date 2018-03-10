export const findKeyCrepeInOrder = (uniqueId, orders) => {
  const keyFound = orders.findIndex((order) => {
    return order.uniqueId === uniqueId;
  });

  return -1 === keyFound ? undefined : keyFound;
}

export const removeOrderFromOrders = (uniqueId, orders) => {
  return orders.filter((order) => {
    return order.uniqueId !== uniqueId;
  });
}
